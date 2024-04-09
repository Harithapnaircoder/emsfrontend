import React, { Component } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';
import Section1 from './Section1';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

class Leave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingLeave: [],
      openSnackbar: false,
      snackbarMessage: '',
      snackbarColor: '',
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:8080/leave/pending');
      this.setState({ pendingLeave: response.data });
    } catch (error) {
      console.error('Error fetching leave data:', error);
    }
  }

  handleApprove = async (id) => {
    try {
        await axios.post(`http://localhost:8080/leave/approve/${id}`);
        const updatedLeave = this.state.pendingLeave.filter((leave) => leave.id !== id);
        this.setState({ pendingLeave: updatedLeave }, () => {
            this.showSnackbar('Leave approved successfully.', 'green');
            window.location.reload();
        });
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                this.showSnackbar('Cannot approve, leave quota is zero', 'red');
            } else if (error.response.status === 404) {
                this.showSnackbar('Leave not found.', 'red');
            } else {
                this.showSnackbar('Failed to approve leave. Please try again later.', 'red');
            }
        } else {
            console.error('Error approving leave:', error.message);
        }
    }
};
  handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:8080/leave/reject/${id}`);
      const updatedLeave = this.state.pendingLeave.filter((leave) => leave.id !== id);
      this.setState({ pendingLeave: updatedLeave }, () => {
        this.showSnackbar('Leave rejected ', 'red');
      });
    } catch (error) {
      console.error('Error rejecting leave:', error);
    }
  };

  handleSnackbarClose = () => {
    this.setState({ openSnackbar: false });
  };

  showSnackbar = (message, color) => {
    this.setState({ snackbarMessage: message, openSnackbar: true, snackbarColor: color });
  };

  render() {
    const { pendingLeave, snackbarColor } = this.state;

    if (pendingLeave.length === 0) {
      return (
        <div>
          <Navbar2 />
          <div className="row">
            <div className="col-md-3">
              <Section1 />
            </div>
            <div className="col-md-9">
              <div style={{ textAlign: 'center', marginTop: '80px', fontFamily: 'Times New Roman' }}>
                <p>No data found</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Navbar2 />
        <div className="container-fluid" style={{ marginTop: '20px' }}>
          <div className="row">
            <div className="col-md-3">
              <Section1 />
            </div>
            <div className="col-md-9">
              <h2 style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}>PENDING LEAVE REQUESTS</h2>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <div>
                  <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#333', color: '#fff', fontFamily: 'Times New Roman' }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Employee</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Leave Type</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Reason</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Start Date</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>End Date</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingLeave.map((leave, index) => (
                        <tr key={leave.id} style={{ backgroundColor: '#fff' }}>
                          <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>{index + 1}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>{leave[1]}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>{leave[2]}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>{leave[3]}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>{new Date(leave[4]).toLocaleDateString()}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>{new Date(leave[5]).toLocaleDateString()}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>
                            <button
                              style={{ backgroundColor: 'green', color: 'white', marginRight: '5px' }}
                              onClick={() => this.handleApprove(leave[0])}
                            >
                              Approve
                            </button>
                            <button
                              style={{ backgroundColor: 'red', color: 'white', fontFamily: 'Times New Roman' }}
                              onClick={() => this.handleReject(leave[0])}
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.openSnackbar}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
        >
          <SnackbarContent
            sx={{ backgroundColor: snackbarColor }} // Change the background color here
            message={this.state.snackbarMessage}
          />
        </Snackbar>
      </div>
    );
  }
}

export default Leave;