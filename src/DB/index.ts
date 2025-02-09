import config from "../config";
import { User } from "../modules/user/user.model";

const newAdminData = {
    name: "Robiul Haque",
    email: "robiulcoc430@gmail.com",
    password: config.admin_login_password,
    role: "admin",
    isVerified: true,
    isBlocked: false,
}

const seedAdmin = async () => {
    // When database is connected, check if admin is already exits, otherwise create a new admin account.
    const isAdminExits = await User.findOne({ role: "admin" });

    if (!isAdminExits) await User.create(newAdminData);
};

export default seedAdmin;