require("dotenv").config(); // Importa o dotenv no início do arquivo
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importa o cors

const app = express();

// Permite requisições de qualquer origem
const corsOptions = {
  origin: "*", // Aceita requisições de qualquer origem
  methods: ["POST"], // Permite GET e POST
  allowedHeaders: ["Content-Type"], // Permite cabeçalhos específicos
};

app.use(cors(corsOptions)); // Adiciona o CORS ao seu servidor

app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Contato pelo portifólio de ${name}`,
    text: message,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email enviado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao enviar email.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
