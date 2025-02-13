import { model, Schema } from "mongoose";

const LikeSchema: Schema = new Schema(
    {
        blog: {
            type: Schema.Types.ObjectId,
            ref: 'Blog',
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }
);

export const Like = model('Like', LikeSchema);