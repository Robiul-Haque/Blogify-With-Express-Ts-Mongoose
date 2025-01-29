import mongoose from "mongoose";

export type TBlog = {
    image?: {
        url: string;
        publicId: string;
    };
    title: string;
    content: string;
    author: mongoose.Schema.Types.ObjectId;
    category: string;
    likes?: number;
    comments?: mongoose.Schema.Types.ObjectId[];
    isPublished?: boolean;
}