import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { blogService } from "./blog.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const img = req.file;
    const newBlog = req.body;

    // Call the service method to create a new blog in the database.
    const result = await blogService.createBlogIntoDB(img, newBlog);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    });
});

const getAllBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    // Call the service method to get all blog in the database.
    const result = await blogService.getAllBlogIntoDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data retrieved successfully",
        data: result
    });
});

const getBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const blogId = req.params.id;
    // Call the service method to get single blog in the database.
    const result = await blogService.getBlogIntoDB(blogId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data retrieved successfully",
        data: result
    });
});

const updateBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const img = req.file;
    const { id, data } = req.body;

    // Call the service method to update a blog in the database.
    // Call the service method to get single blog in the database.
    const result = await blogService.updateBlogIntoDB(id, img, data);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Blog updated successfully",
        data: result
    });
});

export const blogController = {
    createBlog,
    getAllBlog,
    getBlog,
    updateBlog,
}