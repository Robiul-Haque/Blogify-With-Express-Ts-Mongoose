import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { likeService } from "./like.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const Like: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const likeData = req.body;

    // Call the service method to increase like in the database.
    const result = await likeService.LikeIntoDB(likeData);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Like",
        data: result
    })
});

const unLike: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    // Call the service method to decrease like in the database.
    const result = await likeService.unLikeIntoDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Unlike",
        data: result
    })
});

const getAllLike: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    // Call the service method to get all like in the database.
    const result = await likeService.getAllLikeIntoDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data retrieved successfully",
        data: result
    })
});

const deleteLike: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    // Call the service method to delete like in the database.
    const result = await likeService.deleteLikeIntoDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Like delete successfully",
        data: result
    })
});

export const likeController = {
    Like,
    unLike,
    getAllLike,
    deleteLike,
}