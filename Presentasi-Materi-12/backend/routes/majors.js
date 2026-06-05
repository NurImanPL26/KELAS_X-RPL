const router = require('express').Router();
const db     = require('../db');

// GET /api/majors
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM majors ORDER BY id ASC');
    // Map description → desc untuk kompatibilitas frontend
    const mapped = rows.map(r => ({ ...r, desc: r.description }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/majors
router.post('/', async (req, res) => {
  const { name, icon, students, color, border, desc } = req.body;
  if (!name) return res.status(400).json({ error: 'Name wajib diisi' });
  try {
    const [result] = await db.query(
      'INSERT INTO majors (name, icon, students, color, border, description) VALUES (?, ?, ?, ?, ?, ?)',
      [name, icon, students, color, border, desc]
    );
    const [rows] = await db.query('SELECT * FROM majors WHERE id=?', [result.insertId]);
    res.status(201).json({ ...rows[0], desc: rows[0].description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/majors/:id
router.put('/:id', async (req, res) => {
  const { name, icon, students, color, border, desc } = req.body;
  try {
    await db.query(
      'UPDATE majors SET name=?, icon=?, students=?, color=?, border=?, description=? WHERE id=?',
      [name, icon, students, color, border, desc, req.params.id]
    );
    const [rows] = await db.query('SELECT * FROM majors WHERE id=?', [req.params.id]);
    res.json({ ...rows[0], desc: rows[0].description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/majors/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM majors WHERE id=?', [req.params.id]);
    res.json({ success: true, id: parseInt(req.params.id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
