
// all the imports here
import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../types/error.type";

// handle cast error
export const handleCastError = (error: mongoose.Error.CastError): TGenericErrorResponse => {
    const errorSources: TErrorSources = [
        {
            path: error?.path,
            message: error?.message,
        },
    ];

    const statusCode = 400;

    return {
        statusCode,
        message: 'Invalid Id',
        errorSources,
    };
};