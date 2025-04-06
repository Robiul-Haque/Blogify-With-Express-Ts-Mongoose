import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import config from "../config";

// Configuring Cloudinary with API keys and cloud name from environment variables
cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
});

// Function to upload an image to Cloudinary and return the uploaded image details
export const uploadImgToCloudinary = async (imgName: string, imgPath: string) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            imgPath,
            {
                public_id: imgName, // Set the name of the uploaded file
                folder: "Blogify", // The folder in Cloudinary where the image will be stored
            },
            (err, result) => {
                if (err) reject(err);
                resolve(result as UploadApiResponse);
            }
        );
    });
}