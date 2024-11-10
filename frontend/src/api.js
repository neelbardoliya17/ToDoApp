import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw error; 
  }
};
export const addTask = async (taskData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/tasks`,
      taskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
export const fetchTasks = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      params: {
        userId: userId, 
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching tasks');
  }
};

export const deleteTask = async (taskId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const markTaskAsComplete = async (taskId, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/tasks/${taskId}/complete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};


export const updateTask = async (id, taskData, token) => {
    await axios.put(`${API_URL}/tasks/${id}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const getTaskById = async (id, token) => {
    const response = await axios.get(`${API_URL}/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };