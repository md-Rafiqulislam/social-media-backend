import { NextFunction, Request, RequestHandler, Response } from "express";

// catch async function for every try catch operation
export const catchAsync = (cbfn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(cbfn(req, res, next)).catch((error) => next(error));
    };
};
