import AppError from "../../errors/appError";
import { Blog } from "../blog/blog.model";
import { TLike } from "./like.interface";
import { Like } from "./like.model";
import httpStatus from "http-status";

const LikeIntoDB = async (payload: TLike) => {
    // Create like into DB and increse like in the blog.
    const { _id, blog, user } = await Like.create(payload);

    const blogData = await Blog.findById(payload.blog);

    if (blogData && blogData.likes !== undefined) await Blog.findByIdAndUpdate(payload.blog, { likes: blogData.likes + 1 });
    return { _id, blog, user };
}

const unLikeIntoDB = async (id: string) => {
    // Remove like into DB and decrese like in the blog.
    const res = await Like.findOneAndUpdate({ blog: id }, { isDeleted: true }).select(" -isDeleted -createdAt -updatedAt -__v");

    const blogData = await Blog.findById(id);

    if (blogData && blogData.likes !== undefined && blogData.likes !== 0) {
        await Blog.findByIdAndUpdate(id, { likes: blogData.likes - 1 }, { new: true });
    } else {
        throw new AppError(httpStatus.BAD_REQUEST, "Cannot decrease the blog like");
    }
    return res;
}

export const likeService = {
    LikeIntoDB,
    unLikeIntoDB
}