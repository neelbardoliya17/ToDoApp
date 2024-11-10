const express = require('express');
const {
  addTask, getTasks, updateTask, deleteTask,markAsComplete,getTaskById
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.post('/', addTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.put('/:id/complete', markAsComplete);

module.exports = router;
