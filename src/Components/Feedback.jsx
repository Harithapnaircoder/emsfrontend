import React, { Component } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';
import Section1 from './Section1';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: [],
      selectedFeedbackId: null,
      reply: '',
      showReplyForm: false,
      modalOpen: false,
      currentPage: 1,
      feedbacksPerPage: 10, // Number of feedback items per page
      totalPages: 0, // Total number of pages
      snackbarOpen: false,
      snackbarMessage: '',
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:8080/feedbacks/feedback_emp');
      this.setState({ feedback: response.data }, this.updateTotalPages);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  }

  handleApprove = (feedbackId) => {
    this.setState({ selectedFeedbackId: feedbackId, showReplyForm: true, reply: '' });
  };

  handleChangeReply = (event) => {
    this.setState({ reply: event.target.value });
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  handleSnackbarOpen = (message) => {
    this.setState({ snackbarOpen: true, snackbarMessage: message });
  };

  handleSubmitReply = async () => {
    const { selectedFeedbackId, reply } = this.state;
    try {
      await axios.put(`http://localhost:8080/feedbacks/${selectedFeedbackId}/reply`, reply, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      const response = await axios.get('http://localhost:8080/feedbacks/feedback_emp');
      this.setState({ feedback: response.data, showReplyForm: false, modalOpen: false, reply: '' });
      this.handleSnackbarOpen('Reply sent successfully');
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  handleNextPage = () => {
    const { currentPage, totalPages } = this.state;
    if (currentPage < totalPages) {
      this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }));
    }
  };

  handlePreviousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState((prevState) => ({ currentPage: prevState.currentPage - 1 }));
    }
  };

  updateTotalPages = () => {
    const { feedback, feedbacksPerPage } = this.state;
    const totalPages = Math.ceil(feedback.length / feedbacksPerPage);
    this.setState({ totalPages });
  };

  renderPagination = () => {
    const { currentPage, totalPages } = this.state;
    return (
      <div style={{ textAlign: 'center', margin: '10px' }}>
        <button onClick={this.handlePreviousPage} disabled={currentPage === 1} style={{ marginRight: '10px' }}>
          Previous
        </button>
        <button onClick={this.handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  };

  render() {
    const { feedback,  reply, modalOpen, currentPage, feedbacksPerPage, snackbarOpen, snackbarMessage } = this.state;
    const indexOfLastFeedback = currentPage * feedbacksPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
    const currentFeedback = feedback.slice(indexOfFirstFeedback, indexOfLastFeedback);

    if (feedback.length === 0) {
      return (
        <div>
        <Navbar2 />
        <div className="row">
          <div className="col-3 col-md-3">
            <Section1 />
          </div>
          <div className="col-9 col-md-9">
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
        <div className="row">
          <div className="col-3 col-md-3">
            <Section1 />
          </div>
          <div className="col-9 col-md-9">
            <h2 style={{ textAlign: 'center', fontFamily: 'Times New Roman', marginTop: '80px' }}>FEEDBACKS</h2>
            <Modal
              open={modalOpen}
              onClose={() => this.setState({ modalOpen: false })}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <h3 style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}>Reply to Feedback</h3>
                <textarea
                  value={reply}
                  onChange={this.handleChangeReply}
                  placeholder="Enter your reply"
                  style={{ width: '100%', marginBottom: '10px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" onClick={this.handleSubmitReply} sx={{ backgroundColor: 'green', color: 'white' }}>
                    Submit
                  </Button>
                </div>
              </Box>
            </Modal>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  <tr style={{ backgroundColor: '#333', color: '#fff', fontFamily: 'Times New Roman' }}>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Employee</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Feedback</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentFeedback.map((feedbackItem, index) => (
                    <tr key={feedbackItem[0]} style={{ backgroundColor: '#fff' }}>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>
                        {index + 1}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>
                        {feedbackItem[1]}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>
                        {feedbackItem[2]}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>
                        <button
                          style={{ backgroundColor: 'green', color: 'white', marginRight: '5px' }}
                          onClick={() => this.setState({ modalOpen: true, selectedFeedbackId: feedbackItem[0], reply: '' })}
                        >
                          Reply
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {this.renderPagination()}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={this.handleSnackbarClose}>
              <MuiAlert onClose={this.handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                {snackbarMessage}
              </MuiAlert>
            </Snackbar>
          </div>
        </div>
      </div>
    );
  }
}

export default Feedback;