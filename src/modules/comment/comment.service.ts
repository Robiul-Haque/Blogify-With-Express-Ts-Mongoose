import { Blog } from "../blog/blog.model";
import { TComment, TUpdateComment } from "./comment.interface";
import { Comment } from "./comment.model";

const createCommentIntoDB = async (payload: TComment) => {
    // Create comment into DB and push comment id into blog comments array
    const res = await Comment.create(payload);
    await Blog.findByIdAndUpdate(payload.blog, { $push: { comments: res._id } });
    return res;
}
const updateCommentIntoDB = async (payload: TUpdateComment) => {
    // Update comment into DB
    const res = await Comment.findByIdAndUpdate({ _id: payload.id }, { comment: payload.comment }, { new: true }).select("-createdAt -updatedAt -__v");
    return res;
}

const deleteCommentIntoDB = async (id: string) => {
    // Delete comment into DB
    await Comment.findByIdAndDelete(id);
    return null;
}

export const commentService = {
    createCommentIntoDB,
    updateCommentIntoDB,
    deleteCommentIntoDB,
}