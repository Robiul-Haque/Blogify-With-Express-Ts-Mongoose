import { Response } from "express";

// Defining a generic type TApiResponse that represents the structure of an API response
type TApiResponse<T> = {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}

// Function to send a response to the client
const sendResponse = <T>(res: Response, { statusCode, success, message, data }: TApiResponse<T>) => {
    res.status(statusCode).json({
        success,
        message,
        data: data,
    })
}

export default sendResponse;