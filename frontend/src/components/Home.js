import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTasks, deleteTask, markTaskAsComplete } from '../api';
import { jwtDecode } from 'jwt-decode';
import '../styles/Home.css';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPriority, setFilteredPriority] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    fetchTasksData(userId, token);
  }, [navigate]);

  const fetchTasksData = async (userId, token) => {
    try {
      const fetchedTasks = await fetchTasks(userId, token);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const token = localStorage.getItem('token');
      try {
        await deleteTask(id, token);
        fetchTasksData();
      } catch (error) {
        console.error('Failed to delete task', error);
      }
    }
  };

  const handleComplete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: true } : task
        )
      );
      await markTaskAsComplete(id, token);
      fetchTasksData();
    } catch (error) {
      console.error('Failed to mark task as complete', error);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: false } : task
        )
      );
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePriorityFilter = (event) => {
    setFilteredPriority(event.target.value);
  };

  const handleUpdate = (id) => {
    navigate(`/update-task/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((task) => {
      if (filteredPriority === 'all') return true;
      if (filteredPriority === 'completed') return task.completed;
      if (filteredPriority === 'incompleted') return !task.completed;
      return task.priority === filteredPriority;
    });

  return (
    <div className="home-page">
      <header className="header">
        <h1>TODO App</h1>
        <button onClick={() => navigate('/add-task')} className="add-task-button">+ Add Task</button>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <select
          value={filteredPriority}
          onChange={handlePriorityFilter}
          className="priority-filter"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incompleted">Incompleted/Due</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="tasks-container">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task._id} className={`task-card ${task.completed ? 'completed' : ''}`}>
              <h3>{task.title}</h3>
              <p className="due-date">Due Date: <span>{new Date(task.dueDate).toLocaleDateString()}</span></p>
              <p className="priority">Priority: <span className={`priority-${task.priority}`}>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span></p>
              <p className="description">{task.description}</p>
              <div className="task-actions">
                <button onClick={() => handleUpdate(task._id)} className="task-button update-button">Update</button>
                <button onClick={() => handleDelete(task._id)} className="task-button delete-button">Delete</button>
                <button
                  onClick={() => handleComplete(task._id)}
                  className={`task-button complete-button ${task.completed ? 'completed-button' : ''}`}
                >
                  {task.completed ? 'Completed' : 'Mark as Complete'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-tasks-message">No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
