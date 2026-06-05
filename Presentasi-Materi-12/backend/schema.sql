-- ============================================================
-- SCHEMA DATABASE: smkn2buduran
-- Jalankan file ini di MySQL / phpMyAdmin
-- ============================================================

CREATE DATABASE IF NOT EXISTS smkn2buduran
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE smkn2buduran;

-- ------------------------------------------------------------
-- Tabel: hero
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hero (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  description TEXT,
  tagline VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO hero (title, subtitle, description, tagline) VALUES (
  'SMKN 2 Buduran',
  'Sekolah Menengah Kejuruan',
  'Berkomitmen mempersiapkan lulusan yang kompeten, kompetitif di pasar kerja, dan siap berwirausaha.',
  'Unggul, Mumpuni, & Berkarakter'
);

-- ------------------------------------------------------------
-- Tabel: about
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS about (
  id INT PRIMARY KEY AUTO_INCREMENT,
  vision TEXT,
  mission JSON,
  founded VARCHAR(10),
  students VARCHAR(20),
  teachers VARCHAR(20),
  graduates VARCHAR(20),
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(100),
  website VARCHAR(100),
  footer_desc TEXT,
  copyright VARCHAR(255),
  school_name VARCHAR(100),
  about_subtitle VARCHAR(255),
  major_title VARCHAR(100),
  major_subtitle VARCHAR(255),
  news_title VARCHAR(100),
  news_subtitle VARCHAR(255),
  gallery_title VARCHAR(100),
  gallery_subtitle VARCHAR(255),
  ann_title VARCHAR(100),
  ann_subtitle VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO about (
  vision, mission, founded, students, teachers, graduates,
  address, phone, email, website, footer_desc, copyright,
  school_name, about_subtitle, major_title, major_subtitle,
  news_title, news_subtitle, gallery_title, gallery_subtitle,
  ann_title, ann_subtitle
) VALUES (
  'Mewujudkan lembaga pendidikan dan pelatihan yang unggul, mumpuni, berkarakter, berlandaskan IPTEK, serta berbudaya industri dan peduli lingkungan',
  JSON_ARRAY(
    'Menyelenggarakan pendidikan dan pelatihan berstandar mutu tinggi yang berorientasi pada IPTEK dan nilai-nilai kemanusiaan.',
    'Membentuk karakter peserta didik yang beriman, bertakwa, berakhlak mulia, serta melestarikan budaya bangsa.',
    'Menciptakan lingkungan belajar yang aman, nyaman, bersih, dan berwawasan lingkungan.',
    'Menghasilkan lulusan berkualitas yang mampu memenuhi kebutuhan dunia usaha/dunia industri (DUDI) dan memiliki jiwa kewirausahaan.',
    'Meningkatkan kompetensi, profesionalisme, dan kesejahteraan seluruh tenaga pendidik dan kependidikan.'
  ),
  '1979', '1.248', '100', '3.000+',
  'Jl. Jenggolo No. 2A, Siwalanpanji, Kec. Buduran, Kab. Sidoarjo, Jawa Timur 61219',
  '(031) 8964034', 'info@smkn2buduran.sch.id', 'www.smkn2buduran.sch.id',
  'Mendidik generasi kompeten dan berkarakter untuk Indonesia yang lebih maju.',
  '© 2026 SMKN 2 Buduran. Hak Cipta Dilindungi.',
  'SMKN 2 Buduran',
  'Mengenal lebih dekat sekolah kami',
  'Program Keahlian',
  '6 Jurusan unggulan siap membentuk masa depan Anda',
  'Berita & Kegiatan',
  'Informasi terbaru dari SMKN 2 Buduran',
  'Galeri Kegiatan',
  'Momen berharga kegiatan sekolah kami',
  'Pengumuman',
  'Informasi resmi dari pihak sekolah'
);

-- ------------------------------------------------------------
-- Tabel: news
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS news (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  date VARCHAR(50),
  summary TEXT,
  image VARCHAR(10),
  color VARCHAR(100),
  border VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO news (title, category, date, summary, image, color, border) VALUES
  ('SMKN 2 Buduran Raih Juara 1 LKS Nasional', 'Prestasi', '25 Mei 2026',
   'Siswa jurusan Rekayasa Perangkat Lunak berhasil meraih juara pertama dalam Lomba Kompetensi Siswa tingkat nasional di Jakarta.',
   '🏆', 'from-yellow-500/20 to-orange-500/10', 'border-yellow-500/30'),
  ('Penerimaan Peserta Didik Baru 2026/2027 Dibuka', 'Pengumuman', '20 Mei 2026',
   'Pendaftaran SPMB tahun ajaran baru kini resmi dibuka. Tersedia 6 program keahlian dengan kuota terbatas.',
   '📋', 'from-blue-500/20 to-cyan-500/10', 'border-blue-500/30'),
  ('Workshop Kecerdasan Buatan bersama Google', 'Kegiatan', '15 Mei 2026',
   'SMKN 2 Buduran menjalin kerja sama dengan Google Indonesia untuk mengadakan pelatihan AI dan Machine Learning bagi siswa.',
   '🤖', 'from-green-500/20 to-emerald-500/10', 'border-green-500/30'),
  ('Peresmian Lab DKV', 'Fasilitas', '10 Mei 2026',
   'Lab DKV SMKN 2 Buduran resmi dibuka, dilengkapi dengan fasilitas modern untuk mendukung pembelajaran siswa.',
   '🔬', 'from-purple-500/20 to-violet-500/10', 'border-purple-500/30');

-- ------------------------------------------------------------
-- Tabel: announcements
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS announcements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  date VARCHAR(50),
  type ENUM('urgent', 'info', 'warning') DEFAULT 'info',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO announcements (title, date, type) VALUES
  ('Ujian Akhir Semester dimulai 10 Juni 2026', '30 Mei 2026', 'urgent'),
  ('Libur Hari Raya Idul Adha 6-7 Juni 2026', '28 Mei 2026', 'info'),
  ('Pengumpulan Laporan Prakerin Minggu Ini', '27 Mei 2026', 'warning'),
  ('Kegiatan Class Meeting setelah UAS', '25 Mei 2026', 'info'),
  ('Pembayaran SPP Juni Paling Lambat 5 Juni', '24 Mei 2026', 'urgent');

-- ------------------------------------------------------------
-- Tabel: majors
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS majors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(10),
  students VARCHAR(20),
  color VARCHAR(100),
  border VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO majors (name, icon, students, color, border, description) VALUES
  ('Rekayasa Perangkat Lunak', '💻', '108', 'from-blue-500/20 to-blue-600/5', 'border-blue-500/30', 'Pemrograman web, mobile, dan desktop berbasis industri.'),
  ('Layanan Perbankan', '🌐', '108', 'from-purple-500/20 to-purple-600/5', 'border-purple-500/30', 'Instalasi, konfigurasi, dan administrasi jaringan komputer.'),
  ('Desain Komunikasi Visual', '🎨', '324', 'from-pink-500/20 to-pink-600/5', 'border-pink-500/30', 'Desain grafis, videografi, animasi, dan produksi konten digital.'),
  ('Akuntansi', '📊', '324', 'from-green-500/20 to-green-600/5', 'border-green-500/30', 'Pengelolaan keuangan, perpajakan, dan akuntansi modern.'),
  ('Manajemen Perkantoran', '🏢', '216', 'from-orange-500/20 to-orange-600/5', 'border-orange-500/30', 'Manajemen perkantoran, sekretaris, dan layanan bisnis.'),
  ('Bisnis Digital', '🛒', '216', 'from-cyan-500/20 to-cyan-600/5', 'border-cyan-500/30', 'E-commerce, digital marketing, dan manajemen toko online.');

-- ------------------------------------------------------------
-- Tabel: gallery
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS gallery (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  emoji VARCHAR(10),
  color VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO gallery (title, emoji, color) VALUES
  ('Upacara HUT Sekolah ke-21', '🎉', 'bg-blue-500/30'),
  ('Wisuda Angkatan 2025', '🎓', 'bg-purple-500/30'),
  ('LKS Tingkat Provinsi', '🏆', 'bg-yellow-500/30'),
  ('Workshop Industri 4.0', '🤖', 'bg-green-500/30'),
  ('Pameran Karya Siswa', '🎨', 'bg-pink-500/30'),
  ('Kunjungan Industri 2025', '🏭', 'bg-orange-500/30');
