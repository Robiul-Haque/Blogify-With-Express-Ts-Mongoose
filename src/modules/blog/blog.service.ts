import AppError from "../../errors/appError";
import { deleteImgOnCloudinary } from "../../utils/deleteImgToCloudinary";
import { updateImgToCloudinary } from "../../utils/updateImgToCloudinary";
import { uploadImgToCloudinary } from "../../utils/uploadImgToCloudinary";
import { TCreateBlog, TUpdateBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import HttpStatus from "http-status";

const adminCreateBlogIntoDB = async (img: any, payload: TCreateBlog) => {
    if (img) {
        const imagePath = img?.path;
        const imgName = imagePath.split("/").pop()?.split(".")[0] || "";
        // Upload the image to Cloudinary and save the URL and public ID in the DB.
        const { public_id, secure_url } = await uploadImgToCloudinary(imgName, imagePath) as { public_id: string, secure_url: string };

        payload.image = {
            url: secure_url,
            publicId: public_id,
        };
    }

    const res = await Blog.create(payload);
    return res;
}

const adminGetAllBlogIntoDB = async () => {
    const res = await Blog.find();
    return res;
}

const adminGetBlogIntoDB = async (id: string) => {
    const res = await Blog.findById(id);
    if (res?.isPublished === false) throw new AppError(HttpStatus.NOT_FOUND, "Blog is not published yet");
    return res;
}

const adminUpdateBlogIntoDB = async (id: string, img: any, payload: TUpdateBlog) => {
    if (img) {
        const data = await Blog.findById(id);
        const imagePath = img?.path;
        const imgName = imagePath.split("/").pop()?.split(".")[0] || "";
        // Update the image on Cloudinary and get the new URL and public ID & save it DB.
        const { public_id, secure_url } = await updateImgToCloudinary(imgName, imagePath, data?.image?.publicId as string) as { public_id: string, secure_url: string };

        payload.image = {
            url: secure_url,
            publicId: public_id
        };
    }

    const res = await Blog.findByIdAndUpdate(id, payload, { new: true });
    return res;
}

const adminDeleteBlogIntoDB = async (id: string) => {
    const data = await Blog.findById(id);
    if (!data) throw new AppError(HttpStatus.NOT_FOUND, "Blog not found!");

    // Delete image from cloudinary & database
    await deleteImgOnCloudinary(data?.image?.publicId as string);
    await Blog.findByIdAndDelete(id);
    return null;
}

const getAllBlogIntoDB = async () => {
    const res = await Blog.find({ isPublished: true });
    return res;
}

export const blogService = {
    adminCreateBlogIntoDB,
    adminGetAllBlogIntoDB,
    adminGetBlogIntoDB,
    adminUpdateBlogIntoDB,
    adminDeleteBlogIntoDB,
    getAllBlogIntoDB,
};