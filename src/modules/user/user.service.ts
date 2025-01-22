import { uploadImageToCloudinary } from "../../utils/uploadImageToCloudinary";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const signUpIntoDB = async (img: any, payload: TUser) => {

    if (img) {
        const imagePath = img?.path;
        const imgName = imagePath.split("/").pop()?.split(".")[0] || "";
        const { public_id, secure_url } = await uploadImageToCloudinary(imgName, imagePath) as { public_id: string, secure_url: string };

        // Add the uploaded image's URL and public ID to the user payload.
        payload.image = {
            url: secure_url,
            publicId: public_id,
        };
    }

    const res = await User.create(payload);
    return res;
}

export const userService = {
    signUpIntoDB
}