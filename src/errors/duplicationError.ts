import { TErrorSources, TGenericErrorResponse } from "../types/error.type";

// duplication error handler
export const handleDuplicationError = (error: any): TGenericErrorResponse => {
    // extract value within double quotes using regex
    const match = error?.message.match(/"([^"]*)"/);

    // The extracted value will be in the first capturing group
    const extractedMessage = match && match[1];

    const errorSources: TErrorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exists`,
        },
    ];

    const statusCode = 400;

    return {
        statusCode,
        message: 'Invalid field',
        errorSources,
    };
};