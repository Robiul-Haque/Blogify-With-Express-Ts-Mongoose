import { model, Schema } from "mongoose";
import { TLike } from "./like.interface";

const LikeSchema: Schema = new Schema<TLike>(
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

export const Like = model<TLike>('Like', LikeSchema);