import nodemailer from "nodemailer";
import config from "../config";

// Function to send an OTP via email
const sendEmail = async (email: string, otp: string) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: config.user,
            pass: config.password,
        },
    });

    const mailOptions = {
        from: config.email,
        to: email,
        subject: "Verify Your Account",
        text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
}

export default sendEmail;