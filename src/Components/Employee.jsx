import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';

import Section from './Section';

const Employee = () => {
  const [employeeData, setEmployeeData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/employees/${sessionStorage.getItem("empId")}`)
      .then(response => {
        setEmployeeData(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  return (
    <div>
      <Navbar2 />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-3">
            <Section />
          </div>
          
          <div className="col-12 col-md-9">
            <div className="row">
              <div className="col-12">
                <div style={{ textAlign: 'center', fontFamily:'times new roman', fontSize:'20px'}}>
                  <h2>Welcome to the Employee Portal!</h2>
                  <p>Here, you can access important information and resources related to your work.</p>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <table className="table" style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead style={{ backgroundColor: '#333', color: '#fff', fontFamily: 'Times New Roman', textAlign: 'center' }}>
                    <tr>
                      <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>ID</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Full Name</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Email</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Date of Birth</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Address</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Phone Number</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ backgroundColor: '#fff', fontFamily: 'Times New Roman', textAlign: 'center' }}>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employeeData.id}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employeeData.fullName}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employeeData.email}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employeeData.dateOfBirth}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employeeData.address}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employeeData.phoneNumber}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employeeData.department}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;
