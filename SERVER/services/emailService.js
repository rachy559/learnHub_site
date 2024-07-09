const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (email, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: email,
    subject: subject,
    html: text,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error
  }
};

module.exports = { sendMail };