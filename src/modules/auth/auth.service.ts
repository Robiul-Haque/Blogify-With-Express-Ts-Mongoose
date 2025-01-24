import AppError from "../../errors/appError";
import { User } from "../user/user.model";
import httpStatus from "http-status";

const verifyOtpForNewUserIntoDB = async (email: string, otp: string) => {
    // Logic to verify OTP into DB.
    const isUserExists = await User.findOne({ email });
    if (!isUserExists) throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "User not found");

    // Check if OTP matches.
    if (isUserExists.otp !== otp) throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Invalid OTP");

    // Check if OTP has expired.
    if (!isUserExists.otpExpiry || isUserExists.otpExpiry < new Date()) throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "OTP has expired");

    const updateUserData = {
        isVerified: true,
        otp: null,
        otpExpiry: null
    }

    const res = await User.findOneAndUpdate({email}, updateUserData, {new: true}).select("-_id email isVerified");
    return res;
}

export const authService = {
    verifyOtpForNewUserIntoDB
}