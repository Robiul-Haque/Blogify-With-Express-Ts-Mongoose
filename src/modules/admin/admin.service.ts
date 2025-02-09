import { updateImgToCloudinary } from "../../utils/updateImgToCloudinary";
import { Blog } from "../blog/blog.model";
import { User } from "../user/user.model";
import { TUpdateAdmin } from "./admin.interface";

const getDashoardStaticsInToDB = async () => {
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
    // Delete old image and uploaded new image, update the image in the cloudinary and add the new image URL and public ID to the user payload.
    if (img) {
        const data = await User.findById(payload?.id);
        const imagePath = img?.path;
        const imgName = imagePath.split("/").pop().split(".")[0] || "";
        const { public_id, secure_url } = await updateImgToCloudinary(imgName, imagePath, data?.image?.publicId as string) as { public_id: string, secure_url: string };

        payload.image = {
            url: secure_url,
            publicId: public_id,
        };
    }

    const res = await User.findByIdAndUpdate(payload?.id, payload, { new: true });
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
    getDashoardStaticsInToDB,
    getAllUserInToDB,
    updateAdminInToDB,
    getAdminInToDB,
    updateUserBlockedInToDB,
    deleteUserInToDB,
}