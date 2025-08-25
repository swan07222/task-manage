// controllers/taskController.js
const TaskModel = require('../models/taskModel');

const TaskController = {
    async getAllTasks(req, res) {
        try {
            const tasks = await TaskModel.getAllTasks();
            res.json(tasks);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    },

    async searchTasks(req, res) {
        try {
            const { q, status, category } = req.query;
            const tasks = await TaskModel.searchTasks(q, status, category);
            res.json(tasks);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    },

    async addTask(req, res) {
        try {
            const { title, description, status, category } = req.body;

            if (!title || !description || !status || !category) {
                return res.status(400).json({ error: "All fields are required" });
            }

            const task = await TaskModel.addTask(title, description, status, category);
            res.json(task);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    },

    async editTask(req, res) {
        try {
            const { uuid } = req.params;
            const { title, description, status, category } = req.body;

            if (!title || !description || !status || !category) {
                return res.status(400).json({ error: "All fields are required" });
            }

            const task = await TaskModel.editTask(uuid, title, description, status, category);
            res.json({ message: 'Task updated', ...task });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    },

    async deleteTask(req, res) {
        try {
            const { uuid } = req.params;
            await TaskModel.deleteTask(uuid);
            res.json({ message: 'Task deleted', uuid });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = TaskController;