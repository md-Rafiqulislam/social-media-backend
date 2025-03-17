
// all the imports here
import { NextFunction, Request, Response } from "express";
import { envFile } from "../envConfig"; // for env file

// global error handler
export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = error?.statusCode || 500;
    let message = error?.message || 'Something went wrong!';

    // send response
    res.status(statusCode).json({
        status: false,
        statusCode,
        message,
        error,
        stack: envFile.nEnv === 'development' ? error?.stack : null,
    });
};
