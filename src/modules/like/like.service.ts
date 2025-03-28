import AppError from "../../errors/appError";
import { Blog } from "../blog/blog.model";
import { TLike } from "./like.interface";
import { Like } from "./like.model";
import httpStatus from "http-status";

const LikeIntoDB = async (payload: TLike) => {
    // Check if user already liked the blog.
    const existingLike = await Like.findOne({ blog: payload.blog, user: payload.user });
    if (existingLike) throw new AppError(httpStatus.BAD_REQUEST, "You already liked this blog");

    // Create like into DB and increment like in the blog.
    const { _id, blog, user } = await Like.create(payload);

    const blogData = await Blog.findById(payload.blog);

    if (blogData && blogData.likes !== undefined) await Blog.findByIdAndUpdate(payload.blog, { likes: blogData.likes + 1 });
    return { _id, blog, user };
}

const unLikeIntoDB = async (id: string) => {
    // Delete like and decrement like in the blog.
    const like = await Like.findById(id);
    if (!like) throw new AppError(httpStatus.NOT_FOUND, "Like not found");

    const blogData = await Blog.findById(like?.blog);
    if (!blogData) throw new AppError(httpStatus.NOT_FOUND, "Blog not found");

    if (blogData && blogData.likes !== undefined && blogData.likes > 0) {
        await Blog.findByIdAndUpdate(like.blog, { $inc: { likes: -1 } });
    } else {
        throw new AppError(httpStatus.BAD_REQUEST, "Cannot unlike");
    }

    await Like.findByIdAndDelete(id);
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