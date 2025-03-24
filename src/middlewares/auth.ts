
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../errors/appError";
import { catchAsync } from "../utils/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from "../modules/user/user.type";
import { envFile } from "../envConfig";
import { userModel } from "../modules/user/user.model";
import { checkUserIsValid } from "../modules/auth/auth.subService";

// auth middleware
export const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req, res, next) => {
        const token = req.headers.authorization;

        if (!token) {
            sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
        }

        const decoded = jwt.verify(token as string, envFile.accessTokenSecret);

        const { email, userRole } = decoded as JwtPayload;

        if (requiredRoles && !requiredRoles.includes(userRole)) {
            sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
        }

        const user = await userModel.findOne({ email });
        const checkedUser = checkUserIsValid(user);

        if (!checkedUser) {
            sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
        }

        req.user = decoded as JwtPayload & { userRole: string };

        // call the next middleware
        next();
    });
};