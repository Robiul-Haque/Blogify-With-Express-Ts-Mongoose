import { Schema } from "mongoose";

export type TComment = {
    comment: string;
    blog: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
}