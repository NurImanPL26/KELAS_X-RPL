/**
 * init-db.js
 * Jalankan sekali: node init-db.js
 * Script ini otomatis membuat database dan semua tabel di MySQL.
 */

const mysql = require('mysql2/promise');
const fs    = require('fs');
const path  = require('path');
require('dotenv').config();

async function initDatabase() {
  console.log('\n📦 Inisialisasi Database SMKN 2 Buduran...\n');

  // Koneksi TANPA menyebut database dulu (karena belum ada)
  let conn;
  try {
    conn = await mysql.createConnection({
      host:     process.env.DB_HOST || 'localhost',
      port:     parseInt(process.env.DB_PORT) || 3306,
      user:     process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      multipleStatements: true, // izinkan banyak query sekaligus
    });
    console.log('✅ Terhubung ke MySQL');
  } catch (err) {
    console.error('❌ Gagal terhubung ke MySQL!');
    console.error('   Pastikan XAMPP/MySQL sudah dinyalakan.');
    console.error('   Error:', err.message);
    process.exit(1);
  }

  // Baca file schema.sql
  const schemaPath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');

  try {
    await conn.query(sql);
    console.log('✅ Database "smkn2buduran" berhasil dibuat');
    console.log('✅ Semua tabel berhasil dibuat');
    console.log('✅ Data awal berhasil dimasukkan');
    console.log('\n🎉 Selesai! Sekarang jalankan: node server.js\n');
  } catch (err) {
    // Jika tabel sudah ada, anggap sukses
    if (err.code === 'ER_TABLE_EXISTS_ERROR' || err.message.includes('already exists')) {
      console.log('ℹ️  Database sudah ada sebelumnya, melewati pembuatan ulang.');
      console.log('\n🎉 Selesai! Sekarang jalankan: node server.js\n');
    } else {
      console.error('❌ Gagal menjalankan schema.sql:', err.message);
    }
  } finally {
    await conn.end();
  }
}

initDatabase();
