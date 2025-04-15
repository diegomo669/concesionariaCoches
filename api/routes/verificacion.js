// routes/verificacion.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const codigosVerificacion = {}; // Guardamos los códigos por email (en memoria)

// Configura tu transporte de correo (ej. Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'diegomo669@gmail.com',
    pass: 'giefzqooqpudybam'
  }
});

router.post('/verificar-email', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ success: false, message: 'Falta email' });

  const codigo = Math.floor(100000 + Math.random() * 900000).toString();
  codigosVerificacion[email] = codigo;

  const mailOptions = {
    from: 'diegomo669@gmail.com',
    to: email,
    subject: 'Código de verificación - Concesionaria',
    text: `Tu código de verificación es: ${codigo}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Código enviado a ${email}: ${codigo}`);
    res.json({ success: true, codigo }); // ⚠️ En producción no se envía el código de vuelta
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ success: false, message: 'No se pudo enviar el correo.' });
  }
});

module.exports = router;
