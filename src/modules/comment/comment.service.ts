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
    console.log(payload.id, payload.comment);
    
    // Update comment into DB
    const res = await Comment.findByIdAndUpdate({ _id: payload.id }, { comment: payload.comment }, { new: true });
    return res;
}

export const commentService = {
    createCommentIntoDB,
    updateCommentIntoDB,
}