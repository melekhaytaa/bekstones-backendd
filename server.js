// ==========================
// Bekstones | server.js
// ==========================
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import messagesRouter from "./routes/messages.js";


dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
const allowedOrigins = [
  "https://bekstones.com",
  "http://bekstones.com",
  "https://bekstones-api.onrender.com",
  "http://localhost:3000",
  "http://localhost:5500"
];

app.use(cors({
  origin: function (origin, callback) {
    // origin yoksa (mesela Postman gibi) yine izin ver
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.warn("❌ CORS blocked origin:", origin);
      return callback(new Error("CORS policy blocked this origin"), false);
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik dosyalar (frontend)
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/messages", messagesRouter);

// Root yönlendirmesi
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Hata yönetimi (genel)
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ error: "Sunucu hatası oluştu. Lütfen tekrar deneyin." });
});

// Port ayarı
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Bekstones server running: http://localhost:${PORT}`));
