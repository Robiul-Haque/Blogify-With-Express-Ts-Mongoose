import { TComment } from "./comment.interface";
import { Comment } from "./comment.model";

const createCommentIntoDB = async (payload: TComment) => {
    const res = await Comment.create(payload);
    return res;
}

export const commentService = {
    createCommentIntoDB,
}