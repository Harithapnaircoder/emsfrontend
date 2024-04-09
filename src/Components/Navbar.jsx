import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import { HashLink as RouterLink } from 'react-router-hash-link'; // Use HashLink for smooth scrolling
import LogoImage from '../images/logo2.png';



const NavLink = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontSize: '1rem',
  padding: theme.spacing(1),
  textDecoration: 'none',
  border: '1px solid transparent', // Add a small border
  transition: 'border-color 0.3s ease-in-out', // Add transition for smooth hover effect

  '&:hover': {
    textDecoration: 'underline',
    borderColor: 'white', // Change border color on hover
  },
}));

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1, width: '100%', position: 'fixed', zIndex: '100', top: 0 }}>
  <AppBar position="static" sx={{ bgcolor: 'black' }}>
        <Toolbar sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography variant="h6" component={RouterLink} to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <img src={LogoImage} alt="Logo" style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '50%' }} />
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <NavLink component={RouterLink} to="/#" style={{ textDecoration: 'none', color: 'inherit' }}>
                Home
              </NavLink>
              <NavLink component={RouterLink} to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                Login
              </NavLink>
              <NavLink component={RouterLink} to="/#name" style={{ textDecoration: 'none', color: 'inherit' }}>
                About Us
              </NavLink>
              <NavLink component={RouterLink} to="/#services" style={{ textDecoration: 'none', color: 'inherit' }}>
                Services
              </NavLink>
              <NavLink component={RouterLink} to="/#contact" style={{ textDecoration: 'none', color: 'inherit' }}>
                Contact Us
              </NavLink>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
