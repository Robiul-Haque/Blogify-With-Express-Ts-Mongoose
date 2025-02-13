import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { blogService } from "./blog.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const adminCreateBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const img = req.file;
    const newBlog = req.body;

    // Call the service method to admin create a new blog in the database.
    const result = await blogService.adminCreateBlogIntoDB(img, newBlog);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Blog created successfully",
        data: result
    });
});

const adminGetAllBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    // Call the service method to admin get all blog in the database.
    const result = await blogService.adminGetAllBlogIntoDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data retrieved successfully",
        data: result
    });
});

const adminGetBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const blogId = req.params.id;

    // Call the service method to admin get single blog with blog ID in the database.
    const result = await blogService.adminGetBlogIntoDB(blogId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data retrieved successfully",
        data: result
    });
});

const adminUpdateBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const img = req.file;
    const { id, data } = req.body;

    // Call the service method to admin update a blog in the database.
    const result = await blogService.adminUpdateBlogIntoDB(id, img, data);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Blog updated successfully",
        data: result
    });
});

const adminDeleteBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    // Call the service method to admin delete a blog in the database.
    const result = await blogService.adminDeleteBlogIntoDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog delete successfully",
        data: result
    });
});

const getAllBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    // Call the service method to admin get all published blog in the database.
    const result = await blogService.getAllBlogIntoDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data retrieved successfully",
        data: result
    });
});

export const blogController = {
    adminCreateBlog,
    adminGetAllBlog,
    adminGetBlog,
    adminUpdateBlog,
    adminDeleteBlog,
    getAllBlog,
}