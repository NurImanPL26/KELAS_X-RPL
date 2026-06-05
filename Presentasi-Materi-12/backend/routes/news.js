const router = require('express').Router();
const db     = require('../db');

// GET /api/news — semua berita (terbaru dulu)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM news ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/news/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM news WHERE id=?', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Berita tidak ditemukan' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/news — tambah berita baru
router.post('/', async (req, res) => {
  const { title, category, date, summary, image, color, border } = req.body;
  if (!title) return res.status(400).json({ error: 'Title wajib diisi' });
  try {
    const [result] = await db.query(
      'INSERT INTO news (title, category, date, summary, image, color, border) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, category, date, summary, image, color, border]
    );
    const [rows] = await db.query('SELECT * FROM news WHERE id=?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/news/:id — update berita
router.put('/:id', async (req, res) => {
  const { title, category, date, summary, image, color, border } = req.body;
  try {
    await db.query(
      'UPDATE news SET title=?, category=?, date=?, summary=?, image=?, color=?, border=? WHERE id=?',
      [title, category, date, summary, image, color, border, req.params.id]
    );
    const [rows] = await db.query('SELECT * FROM news WHERE id=?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/news/:id — hapus berita
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM news WHERE id=?', [req.params.id]);
    res.json({ success: true, id: parseInt(req.params.id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
