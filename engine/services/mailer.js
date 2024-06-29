const nodemailer = require("nodemailer");

class Mailer {
  static transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  static sendReceipt(email, receiptDetails) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Payment Receipt",
      text: `Thank you for your payment. Here are your receipt details:\n\n${receiptDetails}`,
      html: `<p>Thank you for your payment. Here are your receipt details:</p><pre>${receiptDetails}</pre>`,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  }
}

module.exports = Mailer;
