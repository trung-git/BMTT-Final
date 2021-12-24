const nodemailer = require('nodemailer');
// Email for mailtrap
exports.sendMail = (req, subject, text, To) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });
  const to = To || req.body.email;
  const mailOptions = {
    from: process.env.MAILTRAP_EMAIL_FROM,
    to,
    subject,
    text,
    // html,
  };
  return transport.sendMail(mailOptions);
};
