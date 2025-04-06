import { model, Schema } from "mongoose";
import { TCreateBlog } from "./blog.interface";

const blogSchema: Schema = new Schema<TCreateBlog>(
    {
        image: {
            url: {
                type: String,
            },
            publicId: {
                type: String,
            }
        },
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
            default: true
        },
    }, { timestamps: true }
);

export const Blog = model<TCreateBlog>('Blog', blogSchema);