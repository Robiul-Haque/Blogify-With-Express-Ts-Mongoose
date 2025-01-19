import { NextFunction, Request, Response } from "express";

// Global error handling middleware for handling uncaught errors in the application.
const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: error.message || 'Something went wrong!',
    error: error
  });
}

export default globalErrorHandler;