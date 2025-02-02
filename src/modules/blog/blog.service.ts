import AppError from "../../errors/appError";
import { uploadImgToCloudinary } from "../../utils/uploadImgToCloudinary";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import HttpStatus from "http-status";

const createBlogIntoDB = async (img: any, payload: TBlog) => {
    if (img) {
        const imagePath = img?.path;
        const imgName = imagePath.split("/").pop()?.split(".")[0] || "";
        // Upload the image to Cloudinary and store the URL and public ID
        const { public_id, secure_url } = await uploadImgToCloudinary(imgName, imagePath) as { public_id: string, secure_url: string };

        payload.image = {
            url: secure_url,
            publicId: public_id,
        };
    }
    const res = await Blog.create(payload);
    return res;
}

const getAllBlogIntoDB = async () => {
    const res = await Blog.find({ isPublished: true });
    return res;
}

const getBlogByIdIntoDB = async (id: string) => {
    const res = await Blog.findById(id);
    if (res?.isPublished === false) throw new AppError(HttpStatus.NOT_FOUND, "Blog is not published yet");
    return res;
}

export const blogService = {
    createBlogIntoDB,
    getAllBlogIntoDB,
    getBlogByIdIntoDB,
};