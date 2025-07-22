require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS
  }
});

transporter.sendMail({
  from: process.env.EMAIL_FROM,
  to: "hasimanitriniainajonica@gmail.com",
  subject: "Test",
  text: "Ça fonctionne !"
}, (err, info) => {
  if (err) {
    console.error("Erreur :", err);
  } else {
    console.log("Email envoyé :", info.response);
  }
});
