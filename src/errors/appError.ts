
// create AppError class from Error
export class AppError extends Error {
    public statusCode: number;
    public success: boolean;

    constructor(statusCode: number, message: string, stack?: string) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// create a AppError instance and send error
export const sendError = (statusCode: number, message: string) => {
    throw new AppError(statusCode, message);
};
