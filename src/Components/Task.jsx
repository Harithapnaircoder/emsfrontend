import React, { useState } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';

import { Box, Button, TextField, Typography, Container, Grid, CssBaseline, Avatar, Snackbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Section1 from './Section1';

const theme = createTheme();

const Task = () => {
  const [taskData, setTaskData] = useState({
    employeeId: '',
    taskName: '',
    taskCount: ''
  });

  const [errors, setErrors] = useState({
    employeeId: false,
    taskName: false,
    taskCount: false
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const captureData = () => {
    // Check for empty fields
    if (!taskData.employeeId || !taskData.taskName || !taskData.taskCount) {
      setErrors({
        employeeId: !taskData.employeeId,
        taskName: !taskData.taskName,
        taskCount: !taskData.taskCount
      });
      return;
    }
  
    axios.post('http://localhost:8080/task/tasksave', taskData)
      .then((res) => {
        console.log(res);
        setSnackbarMessage('Task sent successfully');
        setOpenSnackbar(true);
        // Clear the form after submission
        setTaskData({
          employeeId: '',
          taskName: '',
          taskCount: ''
        });
        // Reset errors
        setErrors({
          employeeId: false,
          taskName: false,
          taskCount: false
        });
      })
      .catch((error) => {
        console.error('Error sending task:', error);
        setSnackbarMessage('Error sending task');
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const snackbarLightStyle = {
    backgroundColor: '#4caf50', // Green color for success
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle shadow
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
                  Task Handler
                </Typography>
                <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%', marginTop: '1rem' }}>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        id="employeeId"
                        label="Employee ID"
                        type="number"
                        fullWidth
                        value={taskData.employeeId}
                        onChange={(event) => setTaskData({ ...taskData, employeeId: event.target.value })}
                        error={errors.employeeId}
                        helperText={errors.employeeId ? "Employee ID is required" : ""}
                        sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="taskName"
                        label="Task Name"
                        fullWidth
                        value={taskData.taskName}
                        onChange={(event) => setTaskData({ ...taskData, taskName: event.target.value })}
                        error={errors.taskName}
                        helperText={errors.taskName ? "Task Name is required" : ""}
                        sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="taskCount"
                        label="Task Count"
                        type="number"
                        fullWidth
                        value={taskData.taskCount}
                        onChange={(event) => setTaskData({ ...taskData, taskCount: event.target.value })}
                        error={errors.taskCount}
                        helperText={errors.taskCount ? "Task Count is required" : ""}
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
                    onClick={captureData}
                    sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                  >
                    Send
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

export default Task;
