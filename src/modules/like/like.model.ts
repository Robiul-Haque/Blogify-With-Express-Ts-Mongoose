import { model, Schema } from "mongoose";

const LikeSchema: Schema = new Schema(
    {
        blog: {
            type: Schema.Types.ObjectId,
            ref: 'Blog',
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

export const Like = model('Like', LikeSchema);