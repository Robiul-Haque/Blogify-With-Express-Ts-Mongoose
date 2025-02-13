import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { TUser } from "./user.interface";
import { userService } from "./user.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const signUp: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const img = req.file;
    const newUser = req.body;

    // Call the service method to create a new user in the database.
    const result = await userService.signUpIntoDB(img, newUser as TUser);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Verify Your Account Check your Email!",
        data: result
    });
});

const getDashboardStatics: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    // Call the service method to get dashboard statics.
    const result = await userService.getDashboardStaticsInToDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data retriev successfully",
        data: result
    });
});

const getUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    // Call the service method to get user.
    const result = await userService.getUserInToDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data retriev successfully",
        data: result
    });
});

const updateUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const img = req.file;
    const data = req.body;

    // Call the service method to update user info.
    const result = await userService.updateUserInToDB(img, data);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data update successfully",
        data: result
    });
});

const getAllUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    // Call the service method to get all user.
    const result = await userService.getAllUserInToDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data retrieve successfully",
        data: result
    });
});

const userBlocked: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const { id, status } = req.body;

    // Call the service method to user blocked.
    const result = await userService.userBlockedInToDB(id, status);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User status update successfully",
        data: result
    });
});

const deleteUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    // Call the service method to delete user.
    const result = await userService.deleteUserInToDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User delete successfully",
        data: result
    });
});

export const userController = {
    signUp,
    getDashboardStatics,
    getUser,
    updateUser,
    getAllUser,
    userBlocked,
    deleteUser,
}