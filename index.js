// index.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });


const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("Received contact form submission:", name, email, message); // debug

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.MY_EMAIL,
      subject: `New Contact Message from ${name}`,
      text: message,
      html: `<h3>From: ${name} (${email})</h3><p>${message}</p>`,
    });

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
