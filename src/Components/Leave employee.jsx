import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import Section from './Section';
import {
  Box,
  Button,
  Typography,
  Container,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Snackbar,
  TextField
} from '@mui/material';

const LeaveEmployee = () => {
  const [leaveList, setLeaveList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveData, setLeaveData] = useState({
    leaveType: '',
    reason: '',
    startDate: '',
    endDate: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10); // Decreased items per page for demonstration
  const [minEndDate, setMinEndDate] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchLeaveData();
  }, [currentPage]);

  useEffect(() => {
    if (leaveList.length > 0) {
      const totalPagesCount = Math.ceil(leaveList.length / itemsPerPage);
      setTotalPages(totalPagesCount);
    }
  }, [leaveList, itemsPerPage]);

  const fetchLeaveData = async () => {
    try {
      setLoading(true);
      const empId = sessionStorage.getItem('empId');
      const response = await axios.get(`http://localhost:8080/leave/employee/${empId}`);
      setLeaveList(response.data);
    } catch (error) {
      console.error('Error fetching leave data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        empId: sessionStorage.getItem('empId'),
        leaveType: leaveData.leaveType,
        reason: leaveData.reason,
        startDate: leaveData.startDate,
        endDate: leaveData.endDate
      };

      const response = await axios.post('http://localhost:8080/leave/save', dataToSend);
      console.log(response);
      fetchLeaveData();
      setLeaveData({
        leaveType: '',
        reason: '',
        startDate: '',
        endDate: ''
      });
      setShowLeaveForm(false);
      showSnackbar('Leave application submitted successfully');
    } catch (error) {
      console.error('Error submitting leave application:', error);
      alert('Failed to submit leave application. Please try again.');
    }
  };

  const handleLeaveTypeChange = (event) => {
    setLeaveData({ ...leaveData, leaveType: event.target.value });
  };

  const handleReasonChange = (event) => {
    setLeaveData({ ...leaveData, reason: event.target.value });
  };

  const handleStartDateChange = (event) => {
    const startDate = event.target.value;
    setLeaveData({ ...leaveData, startDate });
    setMinEndDate(startDate);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaveList.slice(indexOfFirstItem, indexOfLastItem);

  const handleEndDateChange = (event) => {
    const selectedEndDate = event.target.value;
    const selectedStartDate = leaveData.startDate;

    if (selectedStartDate && selectedEndDate < selectedStartDate) {
      setLeaveData({ ...leaveData, startDate: selectedEndDate, endDate: selectedEndDate });
    } else {
      setLeaveData({ ...leaveData, endDate: selectedEndDate });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:8080/leave/approve/${id}`);
      fetchLeaveData();
      showSnackbar('Leave approved successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:8080/leave/reject/${id}`);
      fetchLeaveData();
      showSnackbar('Leave rejected successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error rejecting leave:', error);
    }
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
                    marginTop: '20px', // Adjusted marginTop to match Section
                    marginBottom: '20px'
                  }}
                >
                  <Container component="main" maxWidth="md">
                    {showLeaveForm ? (
                      <div>
                        <Typography component="h1" variant="h6" fontWeight="bold" style={{ fontFamily: 'Arial', marginTop: '10px', marginLeft:'310px' }}>
                          Leave Application
                        </Typography>
                        <TextField
                          select
                          id="leaveType"
                          fullWidth
                          required
                          value={leaveData.leaveType}
                          onChange={handleLeaveTypeChange}
                          variant="outlined"
                          margin="normal"
                          SelectProps={{ native: true }}
                          sx={{ marginBottom: '20px', width: '50%', marginLeft:'200px' }}
                        >
                          <option value="">Select Leave Type</option>
                          <option value="Annual">Annual Leave</option>
                          <option value="Sick">Sick Leave</option>
                          <option value="Maternity">Maternity Leave</option>
                          <option value="Paternity">Paternity Leave</option>
                          <option value="Unpaid">Unpaid Leave</option>
                          <option value="Special">Special Leave</option>
                          <option value="Emergency">Emergency Leave</option>
                          <option value="Bereavement">Bereavement Leave</option>
                        </TextField>
                        <br />
                        <TextField
                          id="reason"
                          label="Reason"
                          multiline
                          rows={4}
                          fullWidth
                          required
                          value={leaveData.reason}
                          onChange={handleReasonChange}
                          variant="outlined"
                          margin="normal"
                          sx={{ marginBottom: '20px', width: '50%',marginLeft:'200px' }}
                        />
                        <br />
                        <TextField
                          id="startDate"
                          label="Start Date"
                          type="date"
                          fullWidth
                          required
                          value={leaveData.startDate}
                          onChange={handleStartDateChange}
                          variant="outlined"
                          margin="normal"
                          inputProps={{ min: new Date().toISOString().split('T')[0] }}
                          sx={{ marginBottom: '20px', width: '50%',marginLeft:'200px' }}
                        />
                        <br />
                        <TextField
                          id="endDate"
                          label="End Date"
                          type="date"
                          fullWidth
                          required
                          value={leaveData.endDate}
                          onChange={handleEndDateChange}
                          variant="outlined"
                          margin="normal"
                          inputProps={{ min: new Date().toISOString().split('T')[0] }}
                          sx={{ marginBottom: '20px', width: '50%',marginLeft:'200px' }}
                        />
                        <br />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSubmit}
                          style={{ marginTop: '20px', marginRight: '10px' ,marginLeft:'200px' }}
                        >
                          Submit
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => setShowLeaveForm(false)}
                          style={{ marginTop: '20px',marginLeft:'200px'   }}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setShowLeaveForm(true)}
                            style={{ backgroundColor: '#1976d2' }}
                          >
                            Add Leave
                          </Button>
                        </div>
                        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                          <Table aria-label="leave table">
                            <TableHead>
                              <TableRow style={{ backgroundColor: '#333', color: '#fff', fontFamily: 'Arial', fontWeight: 'bold' }}>
                                <TableCell style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>No.</TableCell>
                                <TableCell style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>Leave Type</TableCell>
                                <TableCell style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>Reason</TableCell>
                                <TableCell style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>Start Date</TableCell>
                                <TableCell style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>End Date</TableCell>
                                <TableCell style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>Status</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {loading ? (
                                <TableRow>
                                  <TableCell colSpan={6}>Loading...</TableCell>
                                </TableRow>
                              ) : leaveList.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={6}>No leave records found</TableCell>
                                </TableRow>
                              ) : (
                                leaveList.map((leave, index) => (
                                  <TableRow key={index + 1} style={{ backgroundColor: '#fff' }}>
                                    <TableCell style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Arial' }}>{index + 1}</TableCell>
                                    <TableCell style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Arial' }}>{leave[1]}</TableCell>
                                    <TableCell style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Arial' }}>{leave[2]}</TableCell>
                                    <TableCell style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Arial' }}>{new Date(leave[3]).toLocaleDateString()}</TableCell>
                                    <TableCell style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Arial' }}>{new Date(leave[4]).toLocaleDateString()}</TableCell>
                                    <TableCell style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Arial' }}>{leave[5]}</TableCell>
                                    <TableCell style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Arial' }}>
                                      {leave[5] === 'Pending' && (
                                        <>
                                          <Button variant="contained" color="primary" onClick={() => handleApprove(leave[0])} style={{ marginRight: '5px' }}>Approve</Button>
                                          <Button variant="contained" color="secondary" onClick={() => handleReject(leave[0])}>Reject</Button>
                                        </>
                                      )}
                                    </TableCell>
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
                      </div>
                    )}
                  </Container>
                </Box>
              </div>
            </div>
          </div>
        </div>
        <Footer />
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
            style: {
              backgroundColor: 'green', // Snackbar message background color set to green
            },
          }}
        />
      </div>
    </div>
  );
};

export default LeaveEmployee;