import nodemailer from "nodemailer";
import config from "../config";

// Function to send an OTP via email
const sendEmail = async (email: string, subject: string, otp: string) => {
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
        text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
}

export default sendEmail;