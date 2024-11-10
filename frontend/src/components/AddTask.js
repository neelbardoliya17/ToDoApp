import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../api';
import '../styles/AddTask.css';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to add a task.');
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString().split('T')[0];

    if (!title || !dueDate || description.length > 30) {
      setError('All fields are required, and description must be under 30 characters.');
      return;
    }

    if (dueDate < currentDate) {
      setError('Due date cannot be in the past.');
      return;
    }

    const taskData = { title, priority, dueDate, description };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in');
        return;
      }

      const response = await addTask(taskData, token);
      setSuccessMessage('Task added successfully!');
      setError('');
      setTitle('');
      setPriority('medium');
      setDueDate('');
      setDescription('');

      setTimeout(() => {
        navigate('/home');
      }, 1000);

    } catch (err) {
      setError('Failed to add task');
      setSuccessMessage('');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="add-task-container">
      <div className="add-task-card">
        <h2>Add New Task</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="add-task-form">
          <div className="form-group">
            <label>Task Name</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
              <label>Description (Max 30 characters)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength="30"
                required
                placeholder="Enter a description (max 30 characters)"
              />
            </div>
          <div className="form-group">
            <label>Priority</label>
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)} 
              required 
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input 
              type="date" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" className="submit-button">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
