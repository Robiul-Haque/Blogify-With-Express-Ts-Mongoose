import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const verifyOtpForNewUser = catchAsync(async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    
    const result = await authService.verifyOtpForNewUserIntoDB(email, otp);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Account Verify Successfully",
        data: result
    });
});

export const authController = {
    verifyOtpForNewUser
}