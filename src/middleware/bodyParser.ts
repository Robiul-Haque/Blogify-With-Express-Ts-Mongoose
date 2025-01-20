import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appError";
import httpStatus from 'http-status';

// Middleware to parse incoming JSON request body into req.body.data
const bodyParser = catchAsync((req: Request, res: Response, next: NextFunction) => {
    if (!req.body.data) throw new AppError(httpStatus.BAD_REQUEST, 'Please provide data in the body under data key');
    req.body = JSON.parse(req.body.data);

    next();
});

export default bodyParser;