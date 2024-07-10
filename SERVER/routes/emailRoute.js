const express = require("express");
const router = express.Router();
const { sendMail } = require("../services/emailService");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  if (!req.body.email || !req.body.subject || !req.body.text) {
    return res.status(400).json({ success: false, message: "Necessary details to send the email are missing" });
  }
  try {
    await sendMail(req.body.email, req.body.subject, req.body.text);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error sending email" });
  }
});

module.exports = router;