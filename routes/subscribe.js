const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { Parser } = require('json2csv'); // CSV için json2csv modülü

// ✅ Abone Ekle (POST)
router.post('/', (req, res) => {
  const { name, email } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Ad ve e-posta gereklidir.' });
  }

  const checkQuery = 'SELECT id FROM subscribers WHERE email = ?';
  db.query(checkQuery, [email], (checkErr, results) => {
    if (checkErr) {
      console.error('Abone kontrol hatası:', checkErr);
      return res.status(500).json({ error: 'Veritabanı hatası.' });
    }

    if (results.length === 0) {
      const insertQuery = 'INSERT INTO subscribers (name, email) VALUES (?, ?)';
      db.query(insertQuery, [name, email], (insertErr) => {
        if (insertErr) {
          console.error('Abonelik ekleme hatası:', insertErr);
          return res.status(500).json({ error: 'Abonelik eklenemedi.' });
        }
        return res.status(200).json({ message: 'Abonelik başarılı.' });
      });
    } else {
      return res.status(200).json({ message: 'Zaten abone olunmuş.' });
    }
  });
});

// ✅ Tüm Aboneleri Listele (GET)
router.get('/', (req, res) => {
  const query = 'SELECT id, name, email, created_at FROM subscribers ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Abone verileri alınamadı:', err);
      return res.status(500).json({ error: 'Veriler getirilemedi.' });
    }
    res.json(results);
  });
});

// ✅ Aboneleri CSV olarak dışa aktar (GET /api/subscribe/export)
router.get('/export', (req, res) => {
  const query = `
    SELECT 
      name AS 'Ad Soyad',
      email AS 'E-posta',
      DATE_FORMAT(created_at, '%d.%m.%Y %H:%i') AS 'Kayıt Tarihi'
    FROM subscribers
    ORDER BY created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('CSV dışa aktarım hatası:', err);
      return res.status(500).json({ error: 'CSV oluşturulamadı.' });
    }

    try {
      const parser = new Parser({ header: true });
      const csv = parser.parse(results);

      res.header('Content-Type', 'text/csv; charset=utf-8');
      res.attachment('aboneler.csv');
      return res.send('\uFEFF' + csv); // BOM ekleyerek Türkçe karakter desteği sağlar
    } catch (parseErr) {
      console.error('CSV dönüştürme hatası:', parseErr);
      return res.status(500).json({ error: 'CSV dönüştürülemedi.' });
    }
  });
});

module.exports = router;
