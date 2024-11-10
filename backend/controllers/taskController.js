const Task = require('../models/Task');
const authenticateUser = require('../middleware/authMiddleware'); 

exports.addTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  const task = new Task({ 
    title, 
    description,
    priority, 
    dueDate, 
    user: req.user.id 
  });

  await task.save();

  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const { completed, priority } = req.query;
  const filters = { user: req.user.id };
  if (completed) filters.completed = completed === 'true';
  if (priority) filters.priority = priority;
  const tasks = await Task.find(filters);
  res.json(tasks);
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });  // Ensure the task belongs to the logged-in user
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching task' });
  }
};

exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
};

exports.markAsComplete = async (req, res) => {
    const { id } = req.params;
  
    try {
      const task = await Task.findById(id);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      task.completed = true;
  
      await task.save();
  
      res.status(200).json({ message: 'Task marked as complete', task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };