import AppError from "../../errors/appError";
import { deleteImgOnCloudinary } from "../../utils/deleteImgToCloudinary";
import { updateImgToCloudinary } from "../../utils/updateImgToCloudinary";
import { uploadImgToCloudinary } from "../../utils/uploadImgToCloudinary";
import { Comment } from "../comment/comment.model";
import { Like } from "../like/like.model";
import { User } from "../user/user.model";
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

const adminGetAllBlogIntoDB = async (name: string) => {
    // Search for blog by title or author's name.
    const regex = new RegExp(name, "i");
    const user = await User.findOne({ name: regex });

    if (user) {
        const res = await Blog.find({ author: user?._id }).select("image title author category likes comments isPublished").populate({ path: "author", select: "name role -_id" });
        return res;
    } else if (!name) {
        const res = await Blog.find().select("image title author category likes comments isPublished").populate({ path: "author", select: "name role -_id" });
        return res;
    } else {
        const res = await Blog.find({ title: regex }).select("image title author category likes comments isPublished").populate({ path: "author", select: "name role -_id" });
        return res
    }
}

const adminChangeBlogStatusIntoDB = async (id: string, payload: boolean) => {
    const res = await Blog.findByIdAndUpdate(id, { isPublished: payload }, { new: true });
    return res;
}

const adminGetBlogForViewIntoDB = async (id: string) => {
    const blog = await Blog.findById(id).populate({ path: "author", select: "name image role -_id" });
    const like = await Like.find({ blog: blog?._id });
    const userLike = await Promise.all(like.map(async (like) => await User.findById(like.user).select("-_id name image")));
    const userComment = await Comment.find({ blog: blog?._id }).populate({ path: "user", select: "name image role -_id" });

    return { blog, userLike, userComment };
}

const adminGetBlogForUpdateIntoDB = async (id: string) => {
    const res = await Blog.findById(id).select("image title content category");
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
    adminChangeBlogStatusIntoDB,
    adminGetBlogForViewIntoDB,
    adminGetBlogForUpdateIntoDB,
    adminUpdateBlogIntoDB,
    adminDeleteBlogIntoDB,
    getAllBlogIntoDB,
};