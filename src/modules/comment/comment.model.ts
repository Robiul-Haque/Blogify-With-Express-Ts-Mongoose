import { model, Schema } from "mongoose";
import { TComment } from "./comment.interface";

const commentSchema: Schema = new Schema<TComment>(
    {
        comment: {
            type: String,
            required: true
        },
        blog: {
            type: Schema.Types.ObjectId,
            ref: 'Blog',
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

export const Comment = model<TComment>('Comment', commentSchema);