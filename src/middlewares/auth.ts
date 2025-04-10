
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../errors/appError";
import { catchAsync } from "../utils/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from "../modules/user/user.type";
import { envFile } from "../envConfig";
import { userModel } from "../modules/user/user.model";
import { checkUserIsValid } from "../modules/auth/auth.subService";
import { Types } from "mongoose";

// auth middleware
export const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req, res, next) => {

        // get the token
        const token = req.headers.authorization;

        // check the token
        if (!token) {
            sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
        }

        // decode and extract the token
        const decoded = jwt.verify(token as string, envFile.accessTokenSecret);
        const { userId, email, userRole } = decoded as JwtPayload;

        // check the valid user Id
        if (!Types.ObjectId.isValid(userId)) {
            sendError(HttpStatus.BAD_REQUEST, 'Invalid User ID.');
        }

        // check the user role
        if (requiredRoles && !requiredRoles.includes(userRole)) {
            sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
        }

        // find the user
        const user = await userModel.findOne({ email }).select('-password');

        // check the user
        const checkedUser = checkUserIsValid(user);
        if (!checkedUser) {
            sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
        }
        if (userId !== String(user?._id)) {
            sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
        }

        // set the user to request
        req.user = decoded as JwtPayload & { userRole: string };

        // call the next middleware
        next();
    });
};