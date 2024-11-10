import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import AddTask from './components/AddTask';
import UpdateTask from './components/UpdateTask';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/update-task/:id" element={<UpdateTask />} />
      </Routes>
    </Router>
  );
};

export default App;
