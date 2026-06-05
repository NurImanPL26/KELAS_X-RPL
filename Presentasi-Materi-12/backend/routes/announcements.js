const router = require('express').Router();
const db     = require('../db');

// GET /api/announcements
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM announcements ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/announcements
router.post('/', async (req, res) => {
  const { title, date, type } = req.body;
  if (!title) return res.status(400).json({ error: 'Title wajib diisi' });
  try {
    const [result] = await db.query(
      'INSERT INTO announcements (title, date, type) VALUES (?, ?, ?)',
      [title, date, type || 'info']
    );
    const [rows] = await db.query('SELECT * FROM announcements WHERE id=?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/announcements/:id
router.put('/:id', async (req, res) => {
  const { title, date, type } = req.body;
  try {
    await db.query(
      'UPDATE announcements SET title=?, date=?, type=? WHERE id=?',
      [title, date, type, req.params.id]
    );
    const [rows] = await db.query('SELECT * FROM announcements WHERE id=?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/announcements/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM announcements WHERE id=?', [req.params.id]);
    res.json({ success: true, id: parseInt(req.params.id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
