import AppError from "../../errors/appError";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import { createToken } from "../../utils/createToken";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import generateOtp from "../../utils/generateOtp";
import sendEmail from "../../utils/sendEmail";

const verifyOtpForNewUserIntoDB = async (email: string, otp: string) => {
    const isUserExists = await User.findOne({ email });
    if (!isUserExists) throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "User not found");

    // Check if OTP matches.
    if (isUserExists.otp !== otp) throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Invalid OTP");

    // Check if OTP has expired.
    if (!isUserExists.otpExpiry || isUserExists.otpExpiry < new Date()) throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "OTP has expired");

    const updateUserData = {
        isVerified: true,
        otp: null,
        otpExpiry: null,
    };

    const res = await User.findOneAndUpdate({ email }, updateUserData, { new: true }).select("-_id email isVerified");

    return res;
};

const signInIntoDB = async (payload: TLoginUser) => {
    const { email, password } = payload;

    if (!email || !password) throw new AppError(httpStatus.BAD_REQUEST, "Email and password are required");

    const existingUser = await User.findOne({ email });

    if (!existingUser) throw new AppError(httpStatus.NOT_FOUND, "User not found");
    if (!existingUser.isVerified) throw new AppError(httpStatus.UNAUTHORIZED, "User is not verified yet");
    if (existingUser.isBlocked) throw new AppError(httpStatus.UNAUTHORIZED, "User already blocked");

    // Compare the hashed password with the provided password.
    const passwordMatch = await bcrypt.compare(String(password), String(existingUser?.password));
    if (!passwordMatch) throw new AppError(httpStatus.NOT_FOUND, "Password did not match");

    // Generate access and refresh token.
    const accessToken = createToken({ id: existingUser?._id.toString(), name: existingUser?.name, email: existingUser?.email, role: existingUser?.role }, config.jwt_access_key as string, config.jwt_access_expire_in as string);
    const refreshToken = createToken({ id: existingUser?._id.toString(), name: existingUser?.name, email: existingUser?.email, role: existingUser?.role }, config.jwt_refresh_key as string, config.jwt_refresh_expire_in as string);

    return { accessToken, refreshToken };
};

const refreshToken = async (token: string) => {
    // Verify and decode the refresh token.
    const { email } = jwt.verify(token, config.jwt_refresh_key as string) as JwtPayload;

    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new AppError(httpStatus.NOT_FOUND, "User not found");

    // Generate a new access token.
    const accessToken = createToken({ id: existingUser?._id.toString(), name: existingUser?.name, email: existingUser?.email, role: existingUser?.role }, config.jwt_access_key as string, config.jwt_access_expire_in as string);

    return { accessToken };
};

const forgetPasswordWithOtp = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError(httpStatus.NOT_FOUND, "Account not found");

    // Generate a 6-digit OTP & expiry time for OTP.
    const { otp, otpExpiry } = generateOtp();

    // Send email with OTP code.
    sendEmail(email, "Forget Password", "Verify Your Account", otp);

    // Save OTP in DB.
    const res = await User.findOneAndUpdate({ email }, { otp, otpExpiry }, { new: true }).select("email -_id");

    return res;
};

const verifyOtp = async (email: string, otp: string) => {
    // Check if the user exists.
    const user = await User.findOne({ email });
    if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

    // Check if the provided OTP matches the stored OTP.
    if (user.otp !== otp) throw new AppError(httpStatus.NOT_FOUND, "OTP is not matching");

    // Delete OTP from DB.
    await User.findOneAndUpdate({ email }, { otp: null, otpExpiry: null });
};

const resetPassword = async (email: string, newPassword: string) => {
    // Check if the user exists.
    const user = await User.findOne({ email });
    if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

    // Hash the new password.
    const hashedNewPassword = await bcrypt.hash(newPassword, Number(config.salt_rounds));

    // Update password in DB.
    await User.findOneAndUpdate({ email }, { password: hashedNewPassword });
};

export const authService = {
    verifyOtpForNewUserIntoDB,
    signInIntoDB,
    refreshToken,
    forgetPasswordWithOtp,
    verifyOtp,
    resetPassword,
};
