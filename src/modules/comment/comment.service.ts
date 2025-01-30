import { Blog } from "../blog/blog.model";
import { TComment } from "./comment.interface";
import { Comment } from "./comment.model";

const createCommentIntoDB = async (payload: TComment) => {
    const res = await Comment.create(payload);
    await Blog.findByIdAndUpdate(payload.blog, { $push: { comments: res._id } });
    return res;
}

export const commentService = {
    createCommentIntoDB,
}