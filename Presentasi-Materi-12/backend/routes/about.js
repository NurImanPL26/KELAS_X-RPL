const router = require('express').Router();
const db     = require('../db');

// GET /api/about
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM about LIMIT 1');
    if (!rows[0]) return res.json({});

    const row = rows[0];
    // Parse mission dari JSON string jika perlu
    if (typeof row.mission === 'string') {
      try { row.mission = JSON.parse(row.mission); } catch {}
    }
    // Map snake_case ke camelCase untuk frontend
    res.json({
      vision:        row.vision,
      mission:       row.mission,
      founded:       row.founded,
      students:      row.students,
      teachers:      row.teachers,
      graduates:     row.graduates,
      address:       row.address,
      phone:         row.phone,
      email:         row.email,
      website:       row.website,
      footerDesc:    row.footer_desc,
      copyright:     row.copyright,
      schoolName:    row.school_name,
      aboutSubtitle: row.about_subtitle,
      majorTitle:    row.major_title,
      majorSubtitle: row.major_subtitle,
      newsTitle:     row.news_title,
      newsSubtitle:  row.news_subtitle,
      galleryTitle:  row.gallery_title,
      gallerySubtitle: row.gallery_subtitle,
      annTitle:      row.ann_title,
      annSubtitle:   row.ann_subtitle,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/about
router.put('/', async (req, res) => {
  const {
    vision, mission, founded, students, teachers, graduates,
    address, phone, email, website, footerDesc, copyright,
    schoolName, aboutSubtitle, majorTitle, majorSubtitle,
    newsTitle, newsSubtitle, galleryTitle, gallerySubtitle,
    annTitle, annSubtitle,
  } = req.body;

  try {
    await db.query(
      `UPDATE about SET
        vision=?, mission=?, founded=?, students=?, teachers=?, graduates=?,
        address=?, phone=?, email=?, website=?, footer_desc=?, copyright=?,
        school_name=?, about_subtitle=?, major_title=?, major_subtitle=?,
        news_title=?, news_subtitle=?, gallery_title=?, gallery_subtitle=?,
        ann_title=?, ann_subtitle=?
       WHERE id=1`,
      [
        vision, JSON.stringify(mission), founded, students, teachers, graduates,
        address, phone, email, website, footerDesc, copyright,
        schoolName, aboutSubtitle, majorTitle, majorSubtitle,
        newsTitle, newsSubtitle, galleryTitle, gallerySubtitle,
        annTitle, annSubtitle,
      ]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
