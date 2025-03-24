
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../errors/appError";
import { catchAsync } from "../utils/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from "../modules/user/user.type";

// auth middleware
export const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req, res, next) => {
        const token = req.headers.authorization;

        if (!token) {
            sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
        }

        jwt.verify(token as string, 'secret', function (error, decoded) {
            if (error) {
                sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
            }

            const role = (decoded as JwtPayload).userRole;

            if (requiredRoles && !requiredRoles.includes(role)) {
                sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
            }

            req.user = decoded as JwtPayload;
            next();
        });
    });
};