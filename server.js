require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // path modülünü ekle

const app = express();
const db = require('./db/connection');

// Statik dosyalar (HTML, CSS, JS vs.)
app.use(express.static(path.join(__dirname, "public"))); // <-- Bunu ekledik

app.use(cors());
app.use(express.json());

// API Rotaları
const subscribeRoute = require('./routes/subscribe');
app.use('/api/subscribe', subscribeRoute);

const adminAuthRoute = require('./routes/adminAuth');
app.use('/api/admin', adminAuthRoute);

const messageRoute = require('./routes/messages');
app.use('/api/messages', messageRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
});
