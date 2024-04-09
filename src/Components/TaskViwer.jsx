import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskViewer = () => {
    const [submittedTasks, setSubmittedTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);

    useEffect(() => {
        // Fetch submitted tasks from backend
        axios.get('http://localhost:8080/task/submitted')
            .then(response => {
                setSubmittedTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching submitted tasks:', error);
            });

        // Fetch pending tasks from backend
        axios.get('http://localhost:8080/task/pending')
            .then(response => {
                setPendingTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching pending tasks:', error);
            });
    }, []);

    return (
        <div>
            <h2>Submitted Tasks</h2>
            <div className="card-container">
                {submittedTasks.map(task => (
                    <div className="card" key={task.id}>
                        <h3>{task.taskName}</h3>
                        <p>Employee: {task.employeeName}</p>
                        <p>Status: Submitted</p>
                    </div>
                ))}
            </div>

            <h2>Pending Tasks</h2>
            <div className="card-container">
                {pendingTasks.map(task => (
                    <div className="card" key={task.id}>
                        <h3>{task.taskName}</h3>
                        <p>Employee: {task.employeeName}</p>
                        <p>Status: Pending</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskViewer;