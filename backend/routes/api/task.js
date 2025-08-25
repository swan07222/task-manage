const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('../../database/db'); // mysql2

const util = require('util');
const query = util.promisify(db.query).bind(db);

// Helper: find or create status/category
async function findOrCreate(table, name) {
  const results = await query(`SELECT id FROM ${table} WHERE LOWER(name)=LOWER(?)`, [name]);
  if (results.length > 0) return results[0].id;

  const insertResult = await query(`INSERT INTO ${table} (name) VALUES (?)`, [name]);
  return insertResult.insertId;
}

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await query(`
      SELECT t.uuid, t.title, t.description, s.name AS status, c.name AS category
      FROM task t
      JOIN status s ON t.status_id = s.id
      JOIN category c ON t.category_id = c.id
    `);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ADD a new task
router.post('/add', async (req, res) => {
  try {
    let { title, description, status, category } = req.body;

    if (!title || !description || !status || !category)
      return res.status(400).json({ error: "All fields are required" });

    status = status.trim();
    category = category.trim();

    const status_id = await findOrCreate('status', status);
    const category_id = await findOrCreate('category', category);

    const taskUuid = uuidv4();
    await query(
      'INSERT INTO task (uuid, title, description, status_id, category_id) VALUES (?, ?, ?, ?, ?)',
      [taskUuid, title, description, status_id, category_id]
    );

    res.json({ uuid: taskUuid, title, description, status, category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// EDIT a task
router.put('/edit/:uuid', async (req, res) => {
  try {
    let { uuid } = req.params;
    uuid = uuid.trim(); // important: remove extra spaces

    const { title, description, status, category } = req.body;
    if (!title || !description || !status || !category)
      return res.status(400).json({ error: "All fields are required" });

    const status_id = await findOrCreate('status', status.trim());
    const category_id = await findOrCreate('category', category.trim());

    // Debug: check if task exists
    const existing = await query('SELECT * FROM task WHERE uuid=?', [uuid]);
    if (existing.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update
    await query(
      'UPDATE task SET title=?, description=?, status_id=?, category_id=? WHERE uuid=?',
      [title, description, status_id, category_id, uuid]
    );

    res.json({ message: 'Task updated', uuid, title, description, status, category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE a task
router.delete('/delete/:uuid', async (req, res) => {
  try {
    let { uuid } = req.params;
    uuid = uuid.trim();

    const result = await query('DELETE FROM task WHERE uuid=?', [uuid]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: 'Task deleted', uuid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
