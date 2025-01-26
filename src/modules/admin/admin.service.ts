import { updateImgToCloudinary } from "../../utils/updateImgToCloudinary";
import { User } from "../user/user.model";
import { TUpdateAdmin } from "./admin.interface";

const getAdminInToDB = async () => {
    const res = await User.find({ role: "admin" }).select("_id name email image role isVerified");
    return res;
}

const updateAdminInToDB = async (img: any, payload: TUpdateAdmin) => {
    if (img) {
        const data = await User.findById(payload?.id);
        const imagePath = img?.path;
        const imgName = imagePath.split("/").pop().split(".")[0] || "";
        const { public_id, secure_url } = await updateImgToCloudinary(imgName, imagePath, data?.image?.publicId as string) as { public_id: string, secure_url: string };

        // Add the uploaded image's URL and public ID to the user payload.
        payload.image = {
            url: secure_url,
            publicId: public_id,
        };
    }

    const res = await User.findByIdAndUpdate(payload?.id, payload, { new: true });
    return res;
}

const getAllUserInToDB = async () => {
    const res = await User.find({ isVerified: true }).sort({ createdAt: "desc" }).select("_id name email image role isVerified");
    return res;
}

export const adminService = {
    getAllUserInToDB,
    updateAdminInToDB,
    getAdminInToDB,
}