import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import config from "../../config";

const verifyOtpForNewUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    // Call the service method to verify OTP for new user in the database.
    const result = await authService.verifyOtpForNewUserIntoDB(email, otp);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Account Verify Successfully!",
      data: result,
    });
  }
);

const signIn: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const loginData = req.body;

    // Call the service method to sign in user in the database.
    const result = await authService.signInIntoDB(loginData);

    if (result) {
      res.cookie("refreshToken", result?.refreshToken, {
        secure: config.node_env === "production",
        httpOnly: true,
      });
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Login successfully!",
        data: result,
      });
    }
  }
);

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  // Call the service method with refresh token for create new token.
  const result = await authService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token is retrieved successfully!",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const email = req.params?.email;

  // Call the service method to forget password.
  const result = await authService.forgetPasswordWithOtp(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Send OTP code check your email!",
    data: result,
  });
});

const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const email = req.body?.email;
  const otp = req.body?.otp;

  // Call the service method to verify OTP for forgot password.
  await authService.verifyOtp(email, otp);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OTP verified successfully",
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const email = req.body?.email;
  const newPassword = req.body?.password;
  // Call the service method to reset password for forgot password.
  await authService.resetPassword(email, newPassword);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password update successfully!",
    data: "",
  });
});

export const authController = {
  verifyOtpForNewUser,
  signIn,
  refreshToken,
  forgetPassword,
  verifyOtp,
  resetPassword,
};
