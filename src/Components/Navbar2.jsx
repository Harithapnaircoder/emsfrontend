import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom'; 
import LogoImage from '../images/logo2.png';


const CustomNavbar = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1, // To occupy the remaining space
  justifyContent: 'space-between', // To push logout link to the right
});

const Navbar2 = () => {
  const handleLogout = () => {
    // Clear session
    sessionStorage.clear();
    // Redirect to home page
    window.location.href = "/";
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'black' }}>
        <Toolbar>
          <CustomNavbar>
            <Typography variant="h6" component={RouterLink} to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <img src={LogoImage} alt="Logo" style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '50%' }} />
            </Typography>
          </CustomNavbar>
          {/* Logout link */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg>
          <span className="nav-link" onClick={handleLogout}>Logout</span>


        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar2;
