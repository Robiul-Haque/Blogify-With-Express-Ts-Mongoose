import { User } from "../user/user.model";

const getAllUserInToDB = async () => {
    const res = await User.find({ isVerified: true }).select("name email image role isVerified");
    return res;
}

export const adminService = {
    getAllUserInToDB,
}