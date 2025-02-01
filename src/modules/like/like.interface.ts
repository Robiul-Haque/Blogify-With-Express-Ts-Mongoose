import mongoose from "mongoose";

export type TLike = {
    blog: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
}