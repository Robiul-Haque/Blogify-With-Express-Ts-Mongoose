import multer from "multer";
import config from "../config";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with the credentials from the configuration file
cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
});

// Create a Cloudinary storage instance for Multer
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Blogify",
        allowed_formats: ["JPG", "jpg", "jpeg", "png", "webp"],
    } as any,
});

const upload = multer({ storage });

export default upload;