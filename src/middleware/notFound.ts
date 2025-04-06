import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

// Middleware to handle not found errors
const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Not found',
        error: null
    });
}

export default notFound;