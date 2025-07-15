const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

app.post('/api/send-email', (req, res) => {
    const { name, email, message, recipient } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sigfrid.kleisnchmidt@gmail.com, // Substitua pelo seu e-mail
            pass: 'Sig9120@#' // Use uma senha de app ou variável de ambiente
        }
    });

    const mailOptions = {
        from: email,
        to: recipient,
        subject: `Nova mensagem de ${name}`,
        text: `Nome: ${name}\nE-mail: ${email}\nMensagem: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Erro ao enviar e-mail' });
        }
        res.status(200).json({ message: 'E-mail enviado com sucesso' });
    });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));