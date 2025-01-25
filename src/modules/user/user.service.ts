import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { TUser } from "./user.interface";
import { uploadImgToCloudinary } from "../../utils/uploadImgToCloudinary";
import sendEmail from "../../utils/sendEmail";
import { User } from "./user.model";
import { deleteImgOnCloudinary } from "../../utils/deleteImgToCloudinary";
import generateOtp from "../../utils/generateOtp";

const signUpIntoDB = async (img: any, payload: TUser) => {
    // Check if a user already exists with the given email, then delete the uploaded image and update the Otp & otpExpiry.
    const isUserExists = await User.findOne({ email: payload.email });
    if (!isUserExists) {
        if (img) {
            const imagePath = img?.path;
            const imgName = imagePath.split("/").pop().split(".")[0] || "";
            const { public_id, secure_url } = await uploadImgToCloudinary(imgName, imagePath) as { public_id: string, secure_url: string };

            // Add the uploaded image's URL and public ID to the user payload.
            payload.image = {
                url: secure_url,
                publicId: public_id,
            };
        }

        // Generate an OTP and set its expiry time.
        const { otp, otpExpiry } = generateOtp();

        payload.otp = otp;
        payload.otpExpiry = otpExpiry;

        // Send an email with the OTP.
        await sendEmail(payload.email, otp);

        const { image, name, email, isVerified } = await User.create(payload);
        return { image, name, email, isVerified };
    } else {
        if (isUserExists.image) deleteImgOnCloudinary(isUserExists.image.publicId);

        if (img) {
            const imagePath = img?.path;
            const imgName = imagePath.split("/").pop().split(".")[0] || "";
            const { public_id, secure_url } = await uploadImgToCloudinary(imgName, imagePath) as { public_id: string, secure_url: string };

            // Add the uploaded image's URL and public ID to the user payload.
            const image = {
                url: secure_url,
                publicId: public_id,
            };

            // Generate an OTP and set its expiry time.
            const { otp, otpExpiry } = generateOtp();

            // Send an email with the OTP.
            await sendEmail(payload.email, otp);

            const res = User.findOneAndUpdate({ email: payload.email }, { image, otp, otpExpiry }, { new: true }).select("-_id name email image isVerified");
            return res;
        }
    }
}

const getAllUserInToDB = async () => {
    const res = await User.find({isVerified: true}).select("name email image role isVerified");
    return res;
}

export const userService = {
    signUpIntoDB,
    getAllUserInToDB
}