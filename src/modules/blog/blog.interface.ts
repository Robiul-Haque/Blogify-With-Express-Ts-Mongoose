import { Schema } from "mongoose";

export type TCreateBlog = {
    image: {
        url: string;
        publicId: string;
    };
    title: string;
    content: string;
    author: Schema.Types.ObjectId;
    category: string;
    likes?: number;
    comments?: Schema.Types.ObjectId[];
    isPublished?: boolean;
}

export type TUpdateBlog = {
    image?: {
        url: string;
        publicId: string;
    };
    title: string;
    content: string;
    category: string;
}