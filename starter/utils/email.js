const nodeMailer = require('nodemailer');
const sendEmail = async (options) => {
  /// 1)create a transporter
  //   const transporter = nodeMailer.createTransport({
  //     service: 'Gmail',
  //     auth: {
  //       user: process.env.EMAIL_USERNAME,
  //       pass: process.env.EMAIL_PASSWORD,
  //     },
  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  /// 2)Define the email options

  const emailOptions = {
    from: 'Abc <a@g.c>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  /// 3)Actually send the email
  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
