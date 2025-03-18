
// all the imports here
import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../types/error.type";

// handle the zod error
export const handleZodError = (error: ZodError): TGenericErrorResponse => {
    // error source
    const errorSources: TErrorSources = error.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        }
    });
    const statusCode = 400;

    return {
        statusCode,
        message: 'validation error',
        errorSources,
    };
};