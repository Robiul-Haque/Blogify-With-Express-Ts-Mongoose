import { NextFunction, Request, RequestHandler, Response } from "express";

// Catch Async is a higher-order function that wraps an async oparation handle to catch errors
const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(error => next(error))
    }
}

export default catchAsync;