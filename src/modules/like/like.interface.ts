import { Schema } from "mongoose";

export type TLike = {
    blog: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    isDeleted?: boolean;
}