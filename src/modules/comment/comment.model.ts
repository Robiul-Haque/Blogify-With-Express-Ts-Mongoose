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
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    { timestamps: true }
);

export const Comment = model<TComment>('Comment', commentSchema);