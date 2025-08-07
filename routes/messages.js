const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { sendNotificationEmail } = require('../utils/mailer'); // ← Bunu ekledik

// GET - Tüm mesajları getir
router.get('/', (req, res) => {
  const query = 'SELECT id, name, email, phone, message, created_at FROM messages ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Mesajlar alınamadı:', err);
      return res.status(500).json({ error: 'Veriler getirilemedi.' });
    }
    res.json(results);
  });
});

// POST - Yeni mesaj ekle
router.post('/', (req, res) => {
  const { name, email, phone, message } = req.body;

  console.log("GELEN BODY:", req.body);

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Ad, e-posta ve mesaj zorunludur.' });
  }

  const query = 'INSERT INTO messages (name, email, phone, message) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, phone, message], async (err) => {
    if (err) {
      console.error('Mesaj kaydedilemedi:', err);
      return res.status(500).json({ error: 'Veritabanı hatası' });
    }

    // ✅ E-posta bildirimi gönder
    try {
      await sendNotificationEmail(name, email, message);
    } catch (emailError) {
      console.error('E-posta bildirimi gönderilemedi:', emailError);
    }

    res.status(200).json({ message: 'Mesaj başarıyla gönderildi.' });
  });
});

module.exports = router;
