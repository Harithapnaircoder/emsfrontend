import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Pagination } from '@mui/material';
import Navbar2 from './Navbar2';

import Section from './Section'; 

const Eventemployee = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    axios.get('http://localhost:8080/Event/eventlist')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = page * itemsPerPage;

  return (
    <div className='row'>
    <Navbar2/>
    <div className="col-3 col-md-3">
      <Section/>
    </div>
    <div className="col-9 col-md-9">
       
        <div style={{ flex: 1, padding: '20px' }}>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <Typography variant="h2" component="h1" style={{ color: '#333', fontWeight: 'bold', textAlign:'center'}}>
              Event
            </Typography>
          </div>
          {data.slice(startIdx, endIdx).map((item, index) => (
            <Card key={index} variant="outlined" style={{ margin: '1rem', backgroundColor: 'grey', color: 'white' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Event ID: {item.event_id}
                </Typography>
                <Typography variant="body1" component="div">
                  Event Name: {item.event_name}
                </Typography>
                <Typography variant="body1" component="div">
                  Event Logo: {item.logo}
                </Typography>
                <Typography variant="body1" component="div">
                  Admin Name: {item.admin_name}
                </Typography>
                <Typography variant="body1" component="div">
                  Event Description: {item.event_description}
                </Typography>
                <Typography variant="body1" component="div">
                  Date of Event: {item.date_event}
                </Typography>
                <Typography variant="body1" component="div">
                  Event Location: {item.event_location}
                </Typography>
              </CardContent>
            </Card>
          ))}
          <Pagination
            count={Math.ceil(data.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            style={{ marginTop: '20px' }}
          />
        </div>
        </div>
      </div>
    
   
  );
};

export default Eventemployee;