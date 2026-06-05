const mysql = require('mysql2/promise');
require('dotenv').config();

// Pool koneksi MySQL — otomatis mengelola banyak koneksi
const pool = mysql.createPool({
  host:     process.env.DB_HOST || 'localhost',
  port:     parseInt(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'smkn2buduran',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test koneksi saat server pertama kali berjalan
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Terhubung ke MySQL:', process.env.DB_NAME || 'smkn2buduran');
    conn.release();
  } catch (err) {
    console.error('❌ Gagal koneksi MySQL:', err.message);
    console.error('   Pastikan MySQL berjalan dan .env sudah dikonfigurasi.');
  }
})();

module.exports = pool;
