import React, { useState } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';

import { Box, Button, TextField, Typography, Container, Grid, CssBaseline, Avatar, Snackbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Section1 from './Section1';

const theme = createTheme();

const snackbarLightStyle = {
  backgroundColor: '#4caf50', // Green color for success
  color: 'white',
  fontWeight: 'bold',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle shadow
};

const Events = () => {
  const [eventData, setEventData] = useState({
    admin_name: '',
    event_description: '',
    date_event: '',
    event_location: '',
    event_name: ''
  });

  const [errors, setErrors] = useState({
    admin_name: false,
    event_name: false,
    event_description: false,
    date_event: false,
    event_location: false
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const captureValue = () => {
    // Check if all fields are filled
    if (!eventData.admin_name || !eventData.event_name || !eventData.event_description || !eventData.date_event || !eventData.event_location) {
      setErrors({
        admin_name: !eventData.admin_name,
        event_name: !eventData.event_name,
        event_description: !eventData.event_description,
        date_event: !eventData.date_event,
        event_location: !eventData.event_location
      });
      return;
    }

    axios.post('http://localhost:8080/Event/eventsave', eventData)
      .then((res) => {
        console.log(res);
        setSnackbarMessage('Event saved successfully');
        setOpenSnackbar(true);
        setEventData({
          admin_name: '',
          event_description: '',
          date_event: '',
          event_location: '',
          event_name: ''
        });
      })
      .catch((error) => {
        console.error('Error saving event:', error);
        setSnackbarMessage('Failed to save event. Please try again.');
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className='row'>
      <Navbar2/>
      <div className="col-3 col-md-3">
        <Section1/>
      </div>
      <div className="col-9 col-md-9">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  backgroundColor: 'white',
                  p: 3,
                  borderRadius: 8,
                  border: '2px solid #ccc',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '80px',
                  marginBottom: '20px',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', backgroundColor: 'red' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h6" fontWeight="bold" style={{ fontFamily: 'Arial', marginTop: '10px' }}>
                  Events Table
                </Typography>
                <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%', marginTop: '1rem' }}>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        id="admin_name"
                        label="Admin Name"
                        fullWidth
                        required
                        error={errors.admin_name}
                        value={eventData.admin_name}
                        onChange={(event) => setEventData({ ...eventData, admin_name: event.target.value })}
                        helperText={errors.admin_name ? "Admin name is required" : ""}
                        sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="event_name"
                        label="Event Name"
                        fullWidth
                        required
                        error={errors.event_name}
                        value={eventData.event_name}
                        onChange={(event) => setEventData({ ...eventData, event_name: event.target.value })}
                        helperText={errors.event_name ? "Event name is required" : ""}
                        sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="event_description"
                        label="Event Description"
                        fullWidth
                        required
                        error={errors.event_description}
                        value={eventData.event_description}
                        onChange={(event) => setEventData({ ...eventData, event_description: event.target.value })}
                        helperText={errors.event_description ? "Event description is required" : ""}
                        sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="date_event"
                        label="Date"
                        type="date"
                        fullWidth
                        required
                        error={errors.date_event}
                        value={eventData.date_event}
                        onChange={(event) => setEventData({ ...eventData, date_event: event.target.value })}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={errors.date_event ? "Date is required" : ""}
                        sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="event_location"
                        label="Event Location"
                        fullWidth
                        required
                        error={errors.event_location}
                        value={eventData.event_location}
                        onChange={(event) => setEventData({ ...eventData, event_location: event.target.value })}
                        helperText={errors.event_location ? "Event location is required" : ""}
                        sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ margin: '1rem 0', backgroundColor: 'black' }}
                    onClick={captureValue}
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            </Container>
          </Box>
        </ThemeProvider>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          ContentProps={{
            style: snackbarLightStyle,
          }}
        />
      </div>
    </div>
  );
};

export default Events;