import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';

import Section1 from './Section1';

const Admin = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/admin/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, []);
  

  return (
    <div className='row'>
      <Navbar2 />
      <div className="col-3 col-md-3"><Section1/></div>
      <div className="col-9 col-md-9">
        <div className="row">
          <div className="col-12">
            
            <div style={{ textAlign: 'center', fontFamily:'times new roman', fontSize:'20px', marginTop:'20px'}}>
              <h2>Employee List</h2>
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
                {employees.map(employee => (
                  <tr key={employee.id} style={{ backgroundColor: '#fff', fontFamily: 'Times New Roman', textAlign: 'center' }}>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employee.id}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employee.fullName}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employee.email}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employee.dateOfBirth}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employee.address}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employee.phoneNumber}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employee.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Admin;
