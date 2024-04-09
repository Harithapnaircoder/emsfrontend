import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import Section from './Section';
import Navbar2 from './Navbar2';

const Taskemployee = () => {
  const [input] = useState({ "id": sessionStorage.getItem("empId") });
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:8080/task/taskemployee', input)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [input]); // Added input as a dependency to re-fetch data when input changes

  const handleSubmit = () => {
    // Define your handleSubmit functionality here
    console.log('Submit clicked');
  };

  const handlePending = () => {
    // Define your handlePending functionality here
    console.log('Pending clicked');
  };

  return (
    <div className='row'>
      <Navbar2 />
      <div className="col-3 col-md-3">
        <Section />
      </div>
      <div className="col-9 col-md-9">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          fontFamily="Times New Roman"
        >
          {data.map((item, index) => (
            <Card key={index} variant="outlined" style={{ margin: '1rem', padding: '1rem' }}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ marginBottom: '0.5rem' }}>
                  Task ID: {item.task_id}
                </Typography>
                <Typography variant="body1" component="div" style={{ marginBottom: '0.5rem' }}>
                  Employee ID: {item.employeeid}
                </Typography>
                <Typography variant="body1" component="div" style={{ marginBottom: '0.5rem' }}>
                  Task Name: {item.task_name}
                </Typography>
                <Typography variant="body1" component="div" style={{ marginBottom: '0.5rem' }}>
                  Task Count: {item.task_count}
                </Typography>
                <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginRight: '1rem' }}>
                  Submit
                </Button>
                <Button variant="contained" color="secondary" onClick={handlePending}>
                  Pending
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default Taskemployee;
