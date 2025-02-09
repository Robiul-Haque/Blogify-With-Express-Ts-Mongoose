import { TUser } from "./user.interface";
import { uploadImgToCloudinary } from "../../utils/uploadImgToCloudinary";
import sendEmail from "../../utils/sendEmail";
import { User } from "./user.model";
import { deleteImgOnCloudinary } from "../../utils/deleteImgToCloudinary";
import generateOtp from "../../utils/generateOtp";

const signUpIntoDB = async (img: any, payload: TUser) => {
    // Check if a user already exists with the given email, then delete the uploaded image form cloudinary and update the Otp & otpExpiry or create new user into DB & upload img to cloudinary.
    const isUserExists = await User.findOne({ email: payload.email });
    if (!isUserExists) {
        const imagePath = img?.path;
        const imgName = imagePath.split("/").pop().split(".")[0] || "";
        const { public_id, secure_url } = await uploadImgToCloudinary(imgName, imagePath) as { public_id: string, secure_url: string };

        // Add the uploaded image's URL and public ID to the user payload.
        payload.image = {
            url: secure_url,
            publicId: public_id,
        };

        // Generate an OTP and set its expiry time.
        const { otp, otpExpiry } = generateOtp();

        payload.otp = otp;
        payload.otpExpiry = otpExpiry;

        // Send an email with the OTP.
        sendEmail(payload.email, "Verify Your Account", "Verify Your Account", otp);

        const { image, name, email, isVerified } = await User.create(payload);
        return { image, name, email, isVerified };
    } else {
        if (isUserExists.image) deleteImgOnCloudinary(isUserExists.image.publicId);

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
        await sendEmail(payload.email, "Verify Your Account", "Verify Your Account", otp);

        const res = User.findOneAndUpdate({ email: payload.email }, { image, otp, otpExpiry }, { new: true }).select("-_id name email image isVerified");
        return res;
    }
}

export const userService = {
    signUpIntoDB,
}