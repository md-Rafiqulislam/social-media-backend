import { Request, Response } from "express";

// not found routes function
export const notFound = (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'API NOT FOUND!!!',
        errorUrl: req.url,
        error: null,
    });
};