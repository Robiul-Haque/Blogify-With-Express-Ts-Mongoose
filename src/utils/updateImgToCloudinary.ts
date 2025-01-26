import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import AppError from '../errors/appError';

// Function to delete an image from Cloudinary
const deleteCloudinaryImage = async (public_id: string) => {
    cloudinary.uploader
        .destroy(public_id)
        .then()
        .catch(err => new AppError(500, `Failed to upload new image: ${err?.message}`));
};

// Function to upload a new image to Cloudinary and delete old image locally and on Cloudinary
export const updateImgToCloudinary = async (newImgName: string, newImgPath: string, existingImgPublicId: string) => {
    // Delete the existing image from Cloudinary
    if (existingImgPublicId) await deleteCloudinaryImage(existingImgPublicId);

    // Upload the new image to Cloudinary
    const result: UploadApiResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            newImgPath,
            {
                public_id: newImgName, // Set the name of the uploaded file
                folder: "Mern-crud", // The folder in Cloudinary where the image will be stored
            },
            (err, result) => {
                if (err) reject(new AppError(500, `Failed to upload new image: ${err.message}`));
                resolve(result as UploadApiResponse);
            },
        );
    });

    return result;
};