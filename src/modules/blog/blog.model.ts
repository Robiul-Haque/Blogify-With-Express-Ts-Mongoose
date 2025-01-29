import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema: Schema = new Schema<TBlog>(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        category: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            default: 0
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        isPublished: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

export const Blog = model<TBlog>('Blog', blogSchema);