import { User } from "../user/user.model";

const getAdminInToDB = async () => {
    const res = await User.find({ role: "admin" }).select("_id name email image role isVerified");
    return res;
}

const getAllUserInToDB = async () => {
    const res = await User.find({ isVerified: true }).select("_id name email image role isVerified");
    return res;
}

export const adminService = {
    getAllUserInToDB,
    getAdminInToDB,
}