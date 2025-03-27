import AppError from "../../errors/appError";
import { Blog } from "../blog/blog.model";
import { TLike } from "./like.interface";
import { Like } from "./like.model";
import httpStatus from "http-status";

const LikeIntoDB = async (payload: TLike) => {
    // Create like into DB and increment like in the blog.
    const { _id, blog, user } = await Like.create(payload);

    const blogData = await Blog.findById(payload.blog);

    if (blogData && blogData.likes !== undefined) await Blog.findByIdAndUpdate(payload.blog, { likes: blogData.likes + 1 });
    return { _id, blog, user };
}

const unLikeIntoDB = async (id: string) => {
    // Delete like and decrement like in the blog.
    const like = await Like.findById(id);

    const blogData = await Blog.findById(like?.blog);

    if (blogData && blogData.likes !== undefined && blogData.likes !== 0) {
        await Blog.findByIdAndUpdate(id, { likes: blogData.likes - 1 });
    } else {
        throw new AppError(httpStatus.BAD_REQUEST, "Cannot unlike");
    }

    await Like.findByIdAndDelete(id).select("-__v");
    return null;
}

const getAllLikeIntoDB = async () => {
    const res = await Like.find();
    return res;
}

const deleteLikeIntoDB = async (id: string) => {
    await Like.findByIdAndDelete(id);
    return null;
}

export const likeService = {
    LikeIntoDB,
    unLikeIntoDB,
    getAllLikeIntoDB,
    deleteLikeIntoDB,
}