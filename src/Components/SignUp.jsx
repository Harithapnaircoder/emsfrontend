import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Navbar2 from './Navbar2';
import Section1 from './Section1';

const theme = createTheme();

const SignUp = () => {
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
    department: '',
  });

  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    password: false,
    dateOfBirth: false,
    address: false,
    phoneNumber: false,
    department: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Remove validation error and red border when typing
    setErrors({ ...errors, [name]: false });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form validation
    const { fullName, email, password, dateOfBirth, address, phoneNumber, department } = formData;
    if (!fullName || !email || !password || !dateOfBirth || !address || !phoneNumber || !department) {
      console.error('All fields are mandatory');
      // Set errors for empty fields
      setErrors({
        fullName: !fullName,
        email: !email,
        password: !password,
        dateOfBirth: !dateOfBirth,
        address: !address,
        phoneNumber: !phoneNumber,
        department: !department,
      });
      return;
    }

    if (!validatePassword(password)) {
      window.alert(`Password must meet the following criteria:\n
        - At least 8 characters long\n
        - Contains at least one uppercase letter\n
        - Contains at least one lowercase letter\n
        - Contains at least one number\n
        - Contains at least one special character\n
        - Not a dictionary word or the name of a person, character, product, or organization\n
        Example: Abc@1234`);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Signup successful!');
        setSignupSuccess(true);
        // Clear form fields
        setFormData({
          fullName: '',
          email: '',
          password: '',
          dateOfBirth: '',
          address: '',
          phoneNumber: '',
          department: '',
        });
        setTimeout(() => {
          setSignupSuccess(false);
        }, 3000);
      } else {
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
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
       

        minHeight: '100vh', // Set minimum height to fill the screen
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              backgroundColor: 'white', // White background color for the form
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
              Employee Registration
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={errors.fullName}
                    name="fullName"
                    label="Full Name"
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="off"
                    sx={{
                      '& label.Mui-focused': { color: 'black' },
                      '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={errors.email}
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                    sx={{
                      '& label.Mui-focused': { color: 'black' },
                      '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={errors.password}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="off new-password"
                    sx={{
                      '& label.Mui-focused': { color: 'black' },
                      '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={errors.dateOfBirth}
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    sx={{
                      '& label.Mui-focused': { color: 'black' },
                      '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={errors.address}
                    name="address"
                    label="Address"
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    sx={{
                      '& label.Mui-focused': { color: 'black' },
                      '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={errors.phoneNumber}
                    name="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    sx={{
                      '& label.Mui-focused': { color: 'black' },
                      '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={errors.department}
                    name="department"
                    label="Department"
                    type="text"
                    id="department"
                    value={formData.department}
                    onChange={handleChange}
                    sx={{
                      '& label.Mui-focused': { color: 'black' },
                      '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } }
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ margin: '1rem 0', backgroundColor: 'black' }}
              >
                Create
              </Button>
              {signupSuccess && (
                <Typography variant="body2" color="primary" align="center">
                  Registration successful! Employee data saved.
                </Typography>
              )}
            </form>
          </Box>
        </Container>
      </Box>
     
    </ThemeProvider>
    </div>
    </div>
  );
};

export default SignUp;
