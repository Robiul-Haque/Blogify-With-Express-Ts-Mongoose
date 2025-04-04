import { model, Schema } from "mongoose";
import { TCreateUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema: Schema = new Schema<TCreateUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            url: {
                type: String,
                default: null
            },
            publicId: {
                type: String,
                default: null
            }
        },
        password: {
            type: String,
            required: true
        },
        bookmark: {
            type: [Schema.Types.ObjectId],
            ref: "Blog",
            default: []
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        otp: {
            type: String,
            default: null
        },
        otpExpiry: {
            type: Date,
            default: null
        }
    }, { timestamps: true }
);

// Middleware to hash the user password before saving it to the database.
userSchema.pre("save", async function (next) {
    const user = this as unknown as TCreateUser;
    user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));
    next();
});

export const User = model<TCreateUser>("User", userSchema);