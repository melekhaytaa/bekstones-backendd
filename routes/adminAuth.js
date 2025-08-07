const express = require('express');
const router = express.Router();
require('dotenv').config();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, error: "Kullanıcı adı ve şifre gerekli." });
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.status(200).json({ success: true, message: "Giriş başarılı." });
  } else {
    return res.status(401).json({ success: false, error: "Geçersiz kullanıcı adı veya şifre." });
  }
});

module.exports = router;
