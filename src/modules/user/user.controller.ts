import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TCreateUser } from "./user.interface";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const signUp: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const img = req.file;
    const newUser = req.body;

    // Call the service method to create a new user in the database.
    const result = await userService.signUpIntoDB(img, newUser as TCreateUser);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Verify Your Account Check your Email!",
        data: result
    });
});

const getAdminDashboardStatics: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    // Call the service method to get admin dashboard statics.
    const result = await userService.getAdminDashboardStaticsInToDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data retrieved successfully",
        data: result
    });
});

const getAdmin: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    // Call the service method to get admin.
    const result = await userService.getAdminInToDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data retrieved successfully",
        data: result
    });
});

const updateAdmin: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const img = req.file;
    const data = req.body;

    // Call the service method to update admin info.
    const result = await userService.updateAdminInToDB(img, data);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data update successfully",
        data: result
    });
});

const adminGetAllUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    // Call the service method to get all user.
    const { status, search } = req.query;
    const result = await userService.adminGetAllUserInToDB(status as string, search as string);

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

const adminDeleteUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    // Call the service method to delete user.
    const result = await userService.adminDeleteUserInToDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User delete successfully",
        data: result
    });
});

const bookmarkBlog: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    // console.log(data);

    // Call the service method to user bookmark blog.
    const result = await userService.bookmarkBlogInToDB(data);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog bookmark successfully",
        data: result
    });
});

export const userController = {
    signUp,
    getAdminDashboardStatics,
    getAdmin,
    updateAdmin,
    adminGetAllUser,
    userBlocked,
    adminDeleteUser,
    bookmarkBlog,
}