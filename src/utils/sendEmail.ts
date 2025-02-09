import nodemailer from "nodemailer";
import config from "../config";

// Function to send an OTP via email
const sendEmail = async (email: string, subject: string, heading: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: config.node_mailer_service,
    auth: {
      user: config.node_mailer_user,
      pass: config.node_mailer_password,
    },
  });

  const mailOptions = {
    from: config.node_mailer_email,
    to: email,
    subject,
    html: `
          <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Verify Your OTP</title>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
                    .container { width: 100%; max-width: 500px; background: #ffffff; margin: 30px auto; padding: 20px;
                        border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); text-align: center; }
                    .logo { width: 100px; margin-bottom: 20px; border-radius: 10px}
                    .title { font-size: 22px; color: #333; }
                    .otp { font-size: 28px; font-weight: bold; color: #007bff; letter-spacing: 2px; margin: 15px 0; }
                    .message { font-size: 16px; color: #555; }
                    .footer { font-size: 14px; color: #888; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2 class="title">Blogify</h2>
                    <h4 class="title">${heading}</h4>
                    <p class="message">Your OTP is</p>
                    <p class="otp">${otp}</p>
                    <p class="message">It will expire in 10 minutes.</p>
                    <p class="footer">If you did not request this, please ignore this email.</p>
                </div>
            </body>
            </html>
    `
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
// text: `Your OTP is ${otp}, it will expire in 10 minutes.`,