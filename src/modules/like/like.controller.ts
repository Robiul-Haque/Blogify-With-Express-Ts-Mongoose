import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { likeService } from "./like.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const Like: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const likeData = req.body;

    // Call the service method to create like in the database.
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

    // Call the service method to unlike in the database.
    const result = await likeService.unLikeIntoDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Unlike",
        data: result
    })
});

export const likeController = {
    Like,
    unLike
}