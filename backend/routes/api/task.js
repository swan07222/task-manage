// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const TaskController = require('../controller/taskController');

router.get('/', TaskController.getAllTasks);
router.get('/search', TaskController.searchTasks);
router.post('/add', TaskController.addTask);
router.put('/edit/:uuid', TaskController.editTask);
router.delete('/delete/:uuid', TaskController.deleteTask);

module.exports = router;