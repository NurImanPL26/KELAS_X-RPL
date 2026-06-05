const router = require('express').Router();
const db     = require('../db');

// GET /api/hero — ambil data hero (selalu 1 baris)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM hero LIMIT 1');
    res.json(rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/hero — update data hero
router.put('/', async (req, res) => {
  const { title, subtitle, description, tagline } = req.body;
  try {
    await db.query(
      'UPDATE hero SET title=?, subtitle=?, description=?, tagline=? WHERE id=1',
      [title, subtitle, description, tagline]
    );
    const [rows] = await db.query('SELECT * FROM hero LIMIT 1');
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
