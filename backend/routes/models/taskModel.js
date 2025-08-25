// models/taskModel.js
const { v4: uuidv4 } = require('uuid');
const db = require('../../database/db');
const util = require('util');

const query = util.promisify(db.query).bind(db);

// Helper: find or create status/category
async function findOrCreate(table, name) {
    const results = await query(`SELECT id FROM ${table} WHERE LOWER(name)=LOWER(?)`, [name]);
    if (results.length > 0) return results[0].id;

    const insertResult = await query(`INSERT INTO ${table} (name) VALUES (?)`, [name]);
    return insertResult.insertId;
}

const TaskModel = {
    async getAllTasks() {
        return await query(`
            SELECT t.uuid, t.title, t.description, s.name AS status, c.name AS category, t.created_at
            FROM task t
            JOIN status s ON t.status_id = s.id
            JOIN category c ON t.category_id = c.id
            ORDER BY t.created_at DESC
        `);
    },

    async searchTasks(q, status, category) {
        let conditions = [];
        let values = [];

        if (q && q.trim() !== '') {
            const term = `%${q.trim()}%`;
            conditions.push("(t.title LIKE ? OR t.description LIKE ? OR c.name LIKE ? OR s.name LIKE ?)");
            values.push(term, term, term, term);
        }

        if (status && status.toLowerCase() !== 'all') {
            conditions.push("LOWER(s.name) = LOWER(?)");
            values.push(status);
        }

        if (category && category.toLowerCase() !== 'all') {
            conditions.push("LOWER(c.name) = LOWER(?)");
            values.push(category);
        }

        const whereClause = conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";

        return await query(`
            SELECT t.uuid, t.title, t.description, s.name AS status, c.name AS category, t.created_at
            FROM task t
            JOIN status s ON t.status_id = s.id
            JOIN category c ON t.category_id = c.id
            ${whereClause}
            ORDER BY t.created_at DESC
        `, values);
    },

    async addTask(title, description, status, category) {
        const status_id = await findOrCreate('status', status);
        const category_id = await findOrCreate('category', category);

        const taskUuid = uuidv4();
        await query(
            'INSERT INTO task (uuid, title, description, status_id, category_id) VALUES (?, ?, ?, ?, ?)',
            [taskUuid, title, description, status_id, category_id]
        );

        return { uuid: taskUuid, title, description, status, category };
    },

    async editTask(uuid, title, description, status, category) {
        const status_id = await findOrCreate('status', status.trim());
        const category_id = await findOrCreate('category', category.trim());

        const existing = await query('SELECT * FROM task WHERE uuid=?', [uuid]);
        if (existing.length === 0) {
            throw new Error("Task not found");
        }

        await query(
            'UPDATE task SET title=?, description=?, status_id=?, category_id=? WHERE uuid=?',
            [title, description, status_id, category_id, uuid]
        );

        return { uuid, title, description, status, category };
    },

    async deleteTask(uuid) {
        const result = await query('DELETE FROM task WHERE uuid=?', [uuid]);
        if (result.affectedRows === 0) {
            throw new Error("Task not found");
        }

        return uuid;
    }
};

module.exports = TaskModel;