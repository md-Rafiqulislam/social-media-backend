
// all the imports here
import { AnyZodObject } from "zod";
import { catchAsync } from "../utils/catchAsync";

// validate requested data
export const validateRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req, res, next) => {
        await schema.parseAsync({
            body: req.body,
            cookies: req.cookies,
        });
        // call the next function
        next();
    });
};