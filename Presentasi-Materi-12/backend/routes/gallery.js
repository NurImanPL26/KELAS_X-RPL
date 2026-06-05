const router = require('express').Router();
const db     = require('../db');

// GET /api/gallery
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM gallery ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/gallery
router.post('/', async (req, res) => {
  const { title, emoji, color } = req.body;
  if (!title) return res.status(400).json({ error: 'Title wajib diisi' });
  try {
    const [result] = await db.query(
      'INSERT INTO gallery (title, emoji, color) VALUES (?, ?, ?)',
      [title, emoji, color]
    );
    const [rows] = await db.query('SELECT * FROM gallery WHERE id=?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/gallery/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM gallery WHERE id=?', [req.params.id]);
    res.json({ success: true, id: parseInt(req.params.id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
