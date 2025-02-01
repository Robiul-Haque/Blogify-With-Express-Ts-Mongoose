import { Blog } from "../blog/blog.model";
import { TLike } from "./like.interface";
import { Like } from "./like.model";

const createLikeIntoDB = async (payload: TLike) => {
    // Create like into DB and push like id into user likes array
    const res = await Like.create(payload);
    const blog = await Blog.findById(payload.blog);
    if (blog && blog.likes !== undefined) await Blog.findByIdAndUpdate(payload.blog, { likes: blog.likes + 1 });
    return res;
}

export const likeService = {
    createLikeIntoDB,
}