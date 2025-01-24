import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { TUser } from "./user.interface";
import { uploadImgToCloudinary } from "../../utils/uploadImgToCloudinary";
import sendEmail from "../../utils/sendEmail";
import crypto from 'crypto';
import { User } from "./user.model";
import { deleteImgOnCloudinary } from "../../utils/deleteImgToCloudinary";

const signUpIntoDB = async (img: any, payload: TUser) => {
    // Check if a user already exists with the given email. If so, delete the uploaded image and throw an error.
    const userExists = await User.findOne({ email: payload.email });
    if (userExists) {
        deleteImgOnCloudinary(img.filename);
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "User already exists with this email");
    }

    if (img) {
        const imagePath = img?.path;
        const imgName = imagePath.split("/").pop()?.split(".")[0] || "";
        const { public_id, secure_url } = await uploadImgToCloudinary(imgName, imagePath) as { public_id: string, secure_url: string };

        // Add the uploaded image's URL and public ID to the user payload.
        payload.image = {
            url: secure_url,
            publicId: public_id,
        };
    }

    // Generate a 6-digit OTP.
    const otp = crypto.randomInt(100000, 999999).toString();
    // Set OTP expiry time (10 minutes from now).
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    payload.otp = otp;
    payload.otpExpiry = otpExpiry;

    // Send an email with the OTP.
    await sendEmail(payload.email, otp);

    const res = await User.create(payload);
    return res;
}

export const userService = {
    signUpIntoDB
}