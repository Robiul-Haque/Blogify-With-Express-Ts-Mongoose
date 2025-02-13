import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { commentService } from "./comment.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const createComment: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const commentData = req.body;

    // Call the service method to create a new blog in the database.
    const result = await commentService.createCommentIntoDB(commentData);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Comment create successfully",
        data: result
    })
});

const getAllComment: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    // Call the service method to get all blog in the database.
    const result = await commentService.getAllCommentIntoDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data retrieved successfully",
        data: result
    })
});

const updateComment: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const updateData = req.body;

    // Call the service method to update blog in the database.
    const result = await commentService.updateCommentIntoDB(updateData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Comment update successfully",
        data: result
    })
});

const deleteComment: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    // Call the service method to delete blog in the database.
    const result = await commentService.deleteCommentIntoDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Comment delete successfully",
        data: result
    })
});

export const commentController = {
    createComment,
    getAllComment,
    updateComment,
    deleteComment,
};