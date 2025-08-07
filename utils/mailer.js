const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // ← Burayı düzelttik
  },
});

async function sendNotificationEmail(name, email, message) {
  const mailOptions = {
    from: `"Bek Stones Web Sitesi" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "Yeni İletişim Formu Mesajı",
    html: `
      <h3>Yeni bir mesaj var:</h3>
      <p><strong>İsim:</strong> ${name}</p>
      <p><strong>E-posta:</strong> ${email}</p>
      <p><strong>Mesaj:</strong> ${message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendNotificationEmail };
