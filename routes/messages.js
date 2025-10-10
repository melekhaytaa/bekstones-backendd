// ==========================
// Bekstones | messages.js
// ==========================
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Lütfen gerekli alanları doldurun." });
    }

    // E-posta gönderici
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465, // true = SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Mail içeriği
    const mailOptions = {
      from: `"Bekstones Web Sitesi" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || "info@bekstones.com",
      subject: `📩 Yeni Mesaj: ${name}`,
      text: `Ad: ${name}\nE-posta: ${email}\nTelefon: ${phone || "-"}\n\nMesaj:\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
          <h2>Yeni İletişim Mesajı</h2>
          <p><b>Ad:</b> ${name}</p>
          <p><b>E-posta:</b> ${email}</p>
          <p><b>Telefon:</b> ${phone || "-"}</p>
          <p><b>Mesaj:</b></p>
          <p>${message}</p>
          <hr>
          <small>Bu mesaj Bekstones web sitesi iletişim formundan gönderilmiştir.</small>
        </div>
      `,
    };

    // Gönderim işlemi
    await transporter.sendMail(mailOptions);

    console.log(`📨 Yeni mesaj başarıyla gönderildi: ${name}`);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Mail gönderim hatası:", err);
    res.status(500).json({ error: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin." });
  }
});

export default router;
