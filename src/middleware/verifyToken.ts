import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import config from "../config";
import { User } from "../modules/admin/user/user.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appError";
import httpStatus from "http-status";

// Middleware to handle token authentication
const verifyToken = (role: string) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");

        try {
            // verify token validity & check user is exist in the database.
            const { email } = jwt.verify(token, config.jwt_access_key as string) as JwtPayload;

            const user = await User.findOne({ email });
            if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");
            if (user.role !== role) throw new AppError(httpStatus.UNAUTHORIZED, `You are not authorized to access this resource with ${role}`);

            next();
        } catch (error) {
            if (error instanceof AppError) throw new AppError(httpStatus.UNAUTHORIZED, error.message);
            if (error instanceof TokenExpiredError) throw new AppError(httpStatus.UNAUTHORIZED, "Token has expired, please login again");
            if (error instanceof JsonWebTokenError) throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token");
        }
    });
}

export default verifyToken;