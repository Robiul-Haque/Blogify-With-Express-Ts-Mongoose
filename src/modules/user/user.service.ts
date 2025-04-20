import { TCreateUser, TUpdateUser } from "./user.interface";
import { uploadImgToCloudinary } from "../../utils/uploadImgToCloudinary";
import generateOtp from "../../utils/generateOtp";
import sendEmail from "../../utils/sendEmail";
import { User } from "./user.model";
import { Blog } from "../blog/blog.model";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { updateImgToCloudinary } from "../../utils/updateImgToCloudinary";
import { deleteImgOnCloudinary } from "../../utils/deleteImgToCloudinary";
import { Types } from "mongoose";

const signUpIntoDB = async (img: any, payload: TCreateUser) => {
    // Check if a user already exists with the given email, then delete the uploaded image form cloudinary and update the Otp & otpExpiry or create new user into DB & upload image to cloudinary.
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
        sendEmail(payload.email, "Verify Your Account", "Verify Your Account", otp);

        const { image, name, email, isVerified } = await User.create(payload);
        return { image, name, email, isVerified };
    } else {
        if (isUserExists.image) deleteImgOnCloudinary(isUserExists.image.publicId);
        let image;

        if (img) {
            const imagePath = img?.path;
            const imgName = imagePath.split("/").pop().split(".")[0] || "";
            const { public_id, secure_url } = await uploadImgToCloudinary(imgName, imagePath) as { public_id: string, secure_url: string };

            // Add the uploaded image's URL and public ID to the user payload.
            image = {
                url: secure_url,
                publicId: public_id,
            };
        }

        // Generate an OTP and set its expiry time.
        const { otp, otpExpiry } = generateOtp();

        // Send an email with the OTP.
        await sendEmail(payload.email, "Verify Your Account", "Verify Your Account", otp);

        const res = User.findOneAndUpdate({ email: payload.email }, { image, otp, otpExpiry }, { new: true }).select("-_id name email image isVerified");
        return res;
    }
}

const getAdminDashboardStaticsInToDB = async () => {
    // Retrieve all statics for dashboard.
    const user = await User.countDocuments();
    const blog = await Blog.countDocuments();
    const topBlogs = await Blog.find({ $or: [{ likes: { $gt: 0 } }, { comments: { $not: { $size: 0 } } }] }).sort({ likes: -1, comments: -1 }).select("-content -__v").populate({ path: "author", select: "name -_id" }).limit(10);
    return { user, blog, topBlogs };
}

const getAdminInToDB = async () => {
    // Get only admin data.
    const res = await User.findOne({ role: "admin" }).select("_id name email image role isVerified");
    return res;
}

const updateAdminInToDB = async (img: any, payload: TUpdateUser) => {
    const isExistsAdmin = await User.findById(payload?.id);
    if (!isExistsAdmin) throw new AppError(httpStatus.NOT_FOUND, "Admin not found");

    // Delete old image and uploaded new image in the cloudinary, add the new image URL & public ID to the user payload.
    if (isExistsAdmin?.image?.url && isExistsAdmin?.image?.publicId) {
        if (img) {
            const imagePath = img?.path;
            const imgName = imagePath.split("/").pop().split(".")[0] || "";
            const { public_id, secure_url } = await updateImgToCloudinary(imgName, imagePath, isExistsAdmin?.image?.publicId as string) as { public_id: string, secure_url: string };

            payload.image = {
                url: secure_url,
                publicId: public_id,
            };
        }

        await User.findByIdAndUpdate(payload?.id, payload);
    }

    // Upload new image to cloudinary and save image URL, public ID & admin name into DB.
    if (isExistsAdmin?.image?.url === null && isExistsAdmin?.image?.publicId === null) {
        if (img) {
            const imagePath = img?.path;
            const imgName = imagePath.split("/").pop().split(".")[0] || "";
            const { public_id, secure_url } = await uploadImgToCloudinary(imgName, imagePath) as { public_id: string, secure_url: string };

            payload.image = {
                url: secure_url,
                publicId: public_id,
            };
        }

        await User.findByIdAndUpdate(payload?.id, payload);
    }

    const res = await User.findById(payload?.id).select("-_id image name email");
    return res;
}

const adminGetAllUserInToDB = async (status: string, search: string) => {
    // Combine filter by status and search into a single query.
    let query: { [key: string]: any } = {};

    if (status) {
        // User filter by status.
        query = status === "active" ? { isBlocked: false } : status === "block" ? { isBlocked: true } : {};
        const res = await User.find(query).sort({ createdAt: -1 }).select("_id name email image role isVerified isBlocked");
        return res;
    } else if (search) {
        // User filter by name or email.
        query = {};
        query.$or = [
            { name: { $regex: search, $options: "i" } }, // Case-insensitive search for name
            { email: { $regex: search, $options: "i" } }, // Case-insensitive search for email
        ];
        const res = await User.find(query).sort({ createdAt: -1 }).select("_id name email image role isVerified isBlocked");
        return res;
    } else {
        // Get all users.
        const res = await User.find().sort({ createdAt: -1 }).select("_id name email image role isVerified isBlocked");
        return res;
    }
}

const userBlockedInToDB = async (id: string, payload: any) => {
    // Update the user blocked status in the database.
    const res = await User.findByIdAndUpdate(id, { isBlocked: payload }, { new: true }).select("-_id isBlocked");
    return res;
}

const adminDeleteUserInToDB = async (id: string) => {
    // Delete a user from the database.
    await User.findByIdAndDelete(id);
    return null;
}

const addBookmarkInToDB = async (payload: { user: string, blog: string }) => {
    const { user, blog } = payload;

    // User bookmark the blog in the database.
    const res = await User.findByIdAndUpdate(user, { $addToSet: { bookmark: blog } }, { new: true }).select("-_id bookmark");
    return res;
}

const removeBookmarkInToDB = async (payload: { user: string, blog: string }) => {
    const { user, blog } = payload;

    // Ensure user and blog are valid ObjectId strings
    if (!Types.ObjectId.isValid(user) || !Types.ObjectId.isValid(blog)) throw new Error("Invalid user ID or blog ID");

    // Remove the blog ID from the bookmark array
    const res = await User.findByIdAndUpdate(user, { $pull: { bookmark: blog } }, { new: true }).select("-_id bookmark");
    return res;
}

const getUserInToDB = async (id: string) => {
    // Get user data.
    const res = await User.findById(id).select("_id name email image role");
    return res;
}

const updateUserInToDB = async (img: any, payload: TUpdateUser) => {
    const isExistsUser = await User.findById(payload?.id);
    if (!isExistsUser) throw new AppError(httpStatus.NOT_FOUND, "User not found");

    // Delete old image and uploaded new image in the cloudinary, add the new image URL & public ID to the user payload.
    if (isExistsUser?.image?.url && isExistsUser?.image?.publicId) {
        if (img) {
            const imagePath = img?.path;
            const imgName = imagePath.split("/").pop().split(".")[0] || "";
            const { public_id, secure_url } = await updateImgToCloudinary(imgName, imagePath, isExistsUser?.image?.publicId as string) as { public_id: string, secure_url: string };

            payload.image = {
                url: secure_url,
                publicId: public_id,
            };
        }

        await User.findByIdAndUpdate(payload?.id, payload);
    }

    // Upload new image to cloudinary and save image URL, public ID & admin name into DB.
    if (isExistsUser?.image?.url === null && isExistsUser?.image?.publicId === null) {
        if (img) {
            const imagePath = img?.path;
            const imgName = imagePath.split("/").pop().split(".")[0] || "";
            const { public_id, secure_url } = await uploadImgToCloudinary(imgName, imagePath) as { public_id: string, secure_url: string };

            payload.image = {
                url: secure_url,
                publicId: public_id,
            };
        }

        await User.findByIdAndUpdate(payload?.id, payload);
    }

    const res = await User.findById(payload?.id).select("-_id image name");
    return res;
}

export const userService = {
    signUpIntoDB,
    getAdminDashboardStaticsInToDB,
    getAdminInToDB,
    updateAdminInToDB,
    adminGetAllUserInToDB,
    userBlockedInToDB,
    adminDeleteUserInToDB,
    addBookmarkInToDB,
    removeBookmarkInToDB,
    getUserInToDB,
    updateUserInToDB,
}