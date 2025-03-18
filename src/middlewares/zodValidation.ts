
// all the imports here
import { AnyZodObject } from "zod";
import { catchAsync } from "../utils/catchAsync";

// validate requested data
export const validateRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req, res, next) => {
        await schema.parseAsync({
            body: req.body,
        });
        // call the next function
        next();
    });
};