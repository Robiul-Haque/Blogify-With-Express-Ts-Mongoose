import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TUser } from "./user.interface";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const signUp: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const img = req.file;
    const newUser = req.body;

    // Call the service method to create a new user in the database.
    const result = await userService.signUpIntoDB(img, newUser as TUser);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Verify Your Account Check your Email",
        data: result
    });
});

export const userController = {
    signUp
}