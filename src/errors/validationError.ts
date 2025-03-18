
// all the imports here
import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../types/error.type";

// validation error
export const handleValidationError = (error: mongoose.Error.ValidationError): TGenericErrorResponse => {
    const errorSources: TErrorSources = Object.values(error.errors).map((value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: value?.path,
            message: value?.message,
        };
    });

    const statusCode = 400;

    return {
        statusCode,
        message: 'validation error!',
        errorSources,
    };
};