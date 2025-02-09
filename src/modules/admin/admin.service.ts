import AppError from "../../errors/appError";
import { updateImgToCloudinary } from "../../utils/updateImgToCloudinary";
import { uploadImgToCloudinary } from "../../utils/uploadImgToCloudinary";
import { Blog } from "../blog/blog.model";
import { User } from "../user/user.model";
import { TUpdateAdmin } from "./admin.interface";
import httpStatus from "http-status";

const getDashboardStaticsInToDB = async () => {
    // Retrieve all statics for dashboard.
    const user = await User.countDocuments();
    const blog = await Blog.countDocuments();
    const topBlogs = await Blog.find({ $or: [{ likes: { $gt: 0 } }, { comments: { $not: { $size: 0 } } }] }).sort({ likes: -1, comments: -1 }).select("-content -__v").populate({ path: "author", select: "name -_id" }).limit(10);
    return { user, blog, topBlogs };
}

const getAdminInToDB = async () => {
    // Retrieve only admin data.
    const res = await User.find({ role: "admin" }).select("_id name email image role isVerified");
    return res;
}

const updateAdminInToDB = async (img: any, payload: TUpdateAdmin) => {
    const isExistsAdmin = await User.findById(payload?.id);
    if (!isExistsAdmin) throw new AppError(httpStatus.NOT_FOUND, "Admin not found");

    // Delete old image and uploaded new image, update the image to cloudinary, add the new image URL & public ID to the user payload.
    if (isExistsAdmin?.image?.url && isExistsAdmin?.image?.publicId) {
        const imagePath = img?.path;
        const imgName = imagePath.split("/").pop().split(".")[0] || "";
        const { public_id, secure_url } = await updateImgToCloudinary(imgName, imagePath, isExistsAdmin?.image?.publicId as string) as { public_id: string, secure_url: string };

        payload.image = {
            url: secure_url,
            publicId: public_id,
        };

        await User.findByIdAndUpdate(payload?.id, payload);
    }

    // Upload new image to cloudinary and save image URL, public ID & admin name into DB.
    if (isExistsAdmin?.image?.url === null && isExistsAdmin?.image?.publicId === null) {
        const imagePath = img?.path;
        const imgName = imagePath.split("/").pop().split(".")[0] || "";
        const { public_id, secure_url } = await uploadImgToCloudinary(imgName, imagePath) as { public_id: string, secure_url: string };

        payload.image = {
            url: secure_url,
            publicId: public_id,
        };

        await User.findByIdAndUpdate(payload?.id, payload);
    }

    const res = await User.findById(payload?.id).select("-_id image name email");
    return res;
}

const getAllUserInToDB = async () => {
    // Retrieve all users who have verified their email addresses.
    const res = await User.find({ isVerified: true }).sort({ createdAt: "desc" }).select("_id name email image role isVerified isBlocked");
    return res;
}

const updateUserBlockedInToDB = async (id: string, payload: any) => {
    // Update the user blocked status in the database.
    const res = await User.findByIdAndUpdate(id, { isBlocked: payload }, { new: true }).select("-_id isBlocked");
    return res;
}

const deleteUserInToDB = async (id: string) => {
    // Delete a user from the database
    await User.findByIdAndDelete(id);
    return null;
}

export const adminService = {
    getDashboardStaticsInToDB,
    getAllUserInToDB,
    updateAdminInToDB,
    getAdminInToDB,
    updateUserBlockedInToDB,
    deleteUserInToDB,
}