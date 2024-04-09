import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

const theme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Response from backend:", data);
        if (data.message === "Signin successful for admin") {
          navigate("/Admin");
        } else if (data) {
          sessionStorage.setItem("empId", data.userId);
          console.log("Employee ID:", data.userId);
          navigate("/Employee");
        }
      } else {
        throw new Error('Signin failed');
      }

    } catch (error) {
      console.error('Fetch error:', error);
      setSnackbarMessage('Signin failed. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundSize: 'cover',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CssBaseline />
        <Navbar />
        <Box sx={{ textAlign: 'center', width: '100%', marginTop: '2rem' }}>
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
                width: '90%',
                mx: 'auto',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main', backgroundColor: 'red' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h6" fontWeight="bold" style={{ fontFamily: 'Arial' }}>
                Sign In
              </Typography>
              <form noValidate onSubmit={handleSubmit} style={{ width: '100%', }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="new-email"
                  autoFocus
                  value={email}
                  onChange={handleEmailChange}
                  sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                  sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ margin: '1rem 0', backgroundColor: 'black' }}
                >
                  Sign In
                </Button>
              </form>
            </Box>
          </Container>
        </Box>
      </Box>
      <Footer />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'centre',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          sx={{ backgroundColor: 'red' }} // Change the background color here
          message={snackbarMessage}
        />
      </Snackbar>
    </ThemeProvider>
  );
};

export default SignIn;
