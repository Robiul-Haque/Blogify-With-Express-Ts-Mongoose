import { Schema } from "mongoose";

export type TComment = {
    comment: string;
    blog: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
}

export type TUpdateComment = {
    id: Schema.Types.ObjectId;
    comment: string;
}