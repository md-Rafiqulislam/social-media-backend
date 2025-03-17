import { Response } from "express";

// type for response
type TResponse<T> = {
    success: boolean;
    statusCode: number;
    message?: string;
    data?: T;
};

// function for send response
export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data?.statusCode).json({
        success: data?.success,
        statusCode: data?.statusCode,
        message: data?.message,
        data: data?.data,
    });
};