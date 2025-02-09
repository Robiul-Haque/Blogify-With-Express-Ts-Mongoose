import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getDashboardStatics: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    // Call the service method to get admin.
    const result = await adminService.getDashboardStaticsInToDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data retriev successfully",
        data: result
    });
});

const getAdmin: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    // Call the service method to get admin.
    const result = await adminService.getAdminInToDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data retriev successfully",
        data: result
    });
});

const updateAdmin: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const img = req.file;
    const data = req.body;

    // Call the service method to update admin info.
    const result = await adminService.updateAdminInToDB(img, data);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data update successfully",
        data: result
    });
});

const getAllUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    // Call the service method to get all user.
    const result = await adminService.getAllUserInToDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Data retrieve successfully",
        data: result
    });
});

const updateUserBlocked: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const { id, status } = req.body;

    // Call the service method to update user blocked status.
    const result = await adminService.updateUserBlockedInToDB(id, status);

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
    const result = await adminService.deleteUserInToDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User delete successfully",
        data: result
    });
});

export const adminController = {
    getDashboardStatics,
    getAdmin,
    updateAdmin,
    getAllUser,
    updateUserBlocked,
    deleteUser,
}