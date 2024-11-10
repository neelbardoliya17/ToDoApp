import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTask, getTaskById } from '../api';
import '../styles/UpdateTask.css';

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('medium');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem('token');
      try {
        const fetchedTask = await getTaskById(id, token);
        setTask(fetchedTask);
        setTitle(fetchedTask.title);
        setDueDate(fetchedTask.dueDate ? new Date(fetchedTask.dueDate).toISOString().split('T')[0] : '');
        setStatus(fetchedTask.status || '');
        setPriority(fetchedTask.priority || 'medium');
        setDescription(fetchedTask.description || '');
      } catch (error) {
        setError('Failed to fetch task');
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await updateTask(id, { title, dueDate, status, priority, description }, token);
      setSuccessMessage('Task updated successfully!');
      setError('');
      setTimeout(() => navigate('/home'), 1000);
    } catch (error) {
      setError('Failed to update task');
      setSuccessMessage('');
    }
  };

  return (
    <div className="update-task-container">
      <div className="update-task-card">
        <h2>Update Task</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {task ? (
          <form onSubmit={handleSubmit} className="update-task-form">
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
            <button type="submit" className="submit-button">Update Task</button>
          </form>
        ) : (
          <p>Loading task...</p>
        )}
      </div>
    </div>
  );
};

export default UpdateTask;
