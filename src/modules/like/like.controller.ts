import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { likeService } from "./like.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createLike: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const likeData = req.body;

    // Call the service method to create like in the database.
    const result = await likeService.createLikeIntoDB(likeData);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Like create successfully",
        data: result
    })
});

export const likeController = {
    createLike
}