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
app.use(cors());
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
