
// all the imports here
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { envFile } from "../envConfig"; // for env file
import { ZodError } from "zod";
import { handleZodError } from "../errors/zodError";
import { TErrorSources } from "../types/error.type";
import { handleValidationError } from "../errors/validationError";
import { handleCastError } from "../errors/castError";
import { handleDuplicationError } from "../errors/duplicationError";
import { AppError } from "../errors/appError";

// global error handler
export const globalErrorHandler: ErrorRequestHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources: TErrorSources = [
        {
            path: req.url,
            message: 'something went wrong!',
        }
    ];


    // every error
    if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (error?.name === 'validationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (error?.name === 'CastError') {
        const simplifiedError = handleCastError(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (error?.code === 11000) {
        const simplifiedError = handleDuplicationError(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (error instanceof AppError) {
        statusCode = error?.statusCode;
        message = error?.message;
        errorSources = [
            {
                path: '',
                message: error?.message,
            },
        ];
    } else if (error instanceof Error) {
        message = error?.message;
        errorSources = [
            {
                path: '',
                message: error?.message,
            },
        ];
    }

    // send response
    res.status(statusCode).json({
        status: false,
        statusCode,
        message,
        errorSources,
        error,
        stack: envFile.nEnv === 'development' ? error?.stack : null,
    });

    // call the next middleware
    // next ();
};
