import AppError from "../../errors/appError";
import { deleteImgOnCloudinary } from "../../utils/deleteImgToCloudinary";
import { updateImgToCloudinary } from "../../utils/updateImgToCloudinary";
import { uploadImgToCloudinary } from "../../utils/uploadImgToCloudinary";
import { TBlog, TUpdateBlog } from "./blog.interface";
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
    const res = await Blog.find();
    return res;
}

const getBlogIntoDB = async (id: string) => {
    const res = await Blog.findById(id);
    if (res?.isPublished === false) throw new AppError(HttpStatus.NOT_FOUND, "Blog is not published yet");
    return res;
}

const updateBlogIntoDB = async (id: string, img: any, payload: TUpdateBlog) => {
    if (img) {
        const data = await Blog.findById(id);
        const imagePath = img?.path;
        const imgName = imagePath.split("/").pop()?.split(".")[0] || "";
        // Update the image on Cloudinary and get the new URL and public ID & save database
        const { public_id, secure_url } = await updateImgToCloudinary(imgName, imagePath, data?.image?.publicId as string) as { public_id: string, secure_url: string };

        payload.image = {
            url: secure_url,
            publicId: public_id
        };
    }
    
    const res = await Blog.findByIdAndUpdate(id, payload, { new: true });
    return res;
}

const deleteBlogIntoDB = async (id: string) => {
    const data = await Blog.findById(id);
    if (!data) throw new AppError(HttpStatus.NOT_FOUND, "Blog not found!");

    // Delete image from cloudinary & database
    await deleteImgOnCloudinary(data?.image?.publicId as string);
    await Blog.findByIdAndDelete(id);
    return null;
}

export const blogService = {
    createBlogIntoDB,
    getAllBlogIntoDB,
    getBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogIntoDB,
};