
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Admin from './Components/Admin';
import Employee from './Components/Employee';
import Events from './Components/Events';
import Feedback from './Components/Feedback';
import Leave from './Components/Leave';
import Task from './Components/Task';
import TaskViewer from './Components/TaskViwer';
import FeedbackEmployee from './Components/FeedbackEmployee';
import EventEmployee from './Components/Eventemployee';
import LeaveEmployee from './Components/Leave employee';
import Taskemployee from './Components/Taskemployee';
import Section from './Components/Section';



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/events" element={<Events />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/task" element={<Task />} />
          <Route path="/feedback" element={<Feedback />} />
<Route path="/feedbackemployee" element={<FeedbackEmployee/>} />

          <Route path="/eventemployee" element={<EventEmployee/>} />
          <Route path="/leaveemployee" element={<LeaveEmployee/>} />
          <Route path="/taskemployee" element={<Taskemployee />} />
          <Route path="/section" element={<Section />} />
          
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/taskviewer" element={<TaskViewer/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
