
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';

import Section from './Section'; // Import the Section component
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Avatar,
  Snackbar,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const FeedbackEmployee = () => {
  const [feedbackData, setFeedbackData] = useState({
    feedback: ''
  });

  const [submissionError, setSubmissionError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false); // State to control the visibility of the feedback form

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const empId = sessionStorage.getItem('empId');
      const response = await axios.get(`http://localhost:8080/feedbacks/list/${empId}`);
      setFeedbackList(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const captureValue = () => {
    if (!feedbackData.feedback) {
      setSubmissionError('Feedback is required');
      return;
    }
  
    setSubmitting(true);
  
    const dataToSend = {
      empId: sessionStorage.getItem('empId'),
      feedback: feedbackData.feedback
    };
  
    axios.post('http://localhost:8080/feedbacks/save', dataToSend)
      .then((res) => {
        console.log(res);
        setSnackbarMessage('Feedback sent successfully');
        setOpenSnackbar(true);
        setFeedbackData({ feedback: '' });
        setSubmitting(false);
        setSubmissionError('');
        // Fetch feedback after successful submission
        fetchFeedback();
        // Show the table and hide the form after submission
        setShowFeedbackForm(false);
      })
      .catch((error) => {
        console.error('Error sending feedback:', error);
        setSubmissionError('Failed to send feedback. Please try again.');
        setSubmitting(false);
      });
  };
  

  useEffect(() => {
    // Fetch feedback on component mount
    fetchFeedback();
  }, []);

  const snackbarLightStyle = {
    backgroundColor: '#4caf50', // Green color for success
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle shadow
  };

  const snackbarDarkStyle = {
    backgroundColor: '#333', // Dark background color
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(255, 255, 255, 0.2)', 
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedbackList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar2 />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Section />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-12">
                <Box
              sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '80px', // Move the marginTop here to ensure consistent spacing
                marginBottom: '20px',
              }}
            >
              
              <Container component="main" maxWidth="xs">
                <Box
                  sx={{
                    display: showFeedbackForm ? 'none' : 'block', // Show feedback table if form is not displayed
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
  
                  <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowFeedbackForm(true)} // Show feedback form on button click
                  style={{ backgroundColor: '#1976d2' }}
                  >
                  Add Feedback
                  </Button>
                  </div>
                  <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                    <Table aria-label="feedback table">
                      <TableHead >
                        <TableRow>
                          <TableCell>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>No.</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Feedback</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Reply</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody style={{ border: '1px solid #ddd', padding: '8px' }}>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={3}>Loading...</TableCell>
                          </TableRow>
                        ) : feedbackList.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={3}>No feedback found</TableCell>
                          </TableRow>
                        ) : (
                          currentItems.map((feedback, index) => (
                            <TableRow key={indexOfFirstItem + index}>
                              <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                              <TableCell>{feedback.feedback}</TableCell>
                              <TableCell>{feedback.reply}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: '10px' }}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentItems.length < itemsPerPage}
                    variant="outlined"
                    color="primary"
                  >
                    Next
                  </Button>
                </Box>
                  <Box
                    sx={{
                      marginTop: '30px',
                    }}
                  >
                    
                  </Box>
                </Box>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    p: 3,
                    borderRadius: 8,
                    border: '2px solid #ccc',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    display: showFeedbackForm ? 'block' : 'none', // Show feedback form if enabled
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main', backgroundColor: 'red' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  
                  <Typography component="h1" variant="h6" fontWeight="bold" style={{ fontFamily: 'Arial', marginTop: '10px' }}>
                    Feedback Form
                  </Typography>
                  <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%', marginTop: '1rem' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          id="feedback"
                          label="Feedback"
                          multiline
                          rows={4}
                          fullWidth
                          required
                          error={!!submissionError} 
                          helperText={submissionError}
                          value={feedbackData.feedback}
                          onChange={(event) => setFeedbackData({ ...feedbackData, feedback: event.target.value })}
                          sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                        />
                      </Grid>
                    </Grid>
                                      <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ margin: '1rem', backgroundColor: 'black' }}
                      onClick={captureValue}
                    >
                    Submit
                    </Button>
                    <Button
                      type="button" // Change type to button
                      variant="contained"
                      color="primary"
                      style={{ margin: '1rem', backgroundColor: 'black' }}
                      onClick={() => setShowFeedbackForm(false)} // Handle cancel button click
                    >
                    Cancel
                    </Button>
                    

                  </form>
                </Box>
                {/* Pagination */}
               
              </Container>
            </Box>
          </div>
        </div>
      </div>
      
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        ContentProps={{
          style: snackbarLightStyle, // You can change to snackbarDarkStyle for dark theme
        }}
      />
    </div>
    </div>
    </div>
    
  );
};

export default FeedbackEmployee;