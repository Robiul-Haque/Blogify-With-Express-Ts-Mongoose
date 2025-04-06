import crypto from 'crypto';
const generateOtp = () => {
    // Generate a 6-digit OTP.
    const otp = crypto.randomInt(100000, 999999).toString();

    // Set OTP expiry time (10 minutes from now).
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    return { otp, otpExpiry };
}

export default generateOtp;