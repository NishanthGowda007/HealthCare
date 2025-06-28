const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Setup transporter with correct Gmail credentials
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "snehanishgowda013@gmail.com",
    pass: "rnzj vnsp izoa ysko", // this should be your Gmail App Password
  },
});

// POST endpoint to send email
router.post("/", async (req, res) => {
  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const mailOptions = {
    from: '"HealthCare App" <snehanishgowda013@gmail.com>', // better to use your real Gmail here
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
    res.status(200).json({ message: "Email sent" });
  } catch (err) {
    console.error("❌ Email Error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
