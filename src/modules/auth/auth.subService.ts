
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../../errors/appError";
import { TUser } from "../user/user.type";
import { userStatus } from "../user/user.constant";

// check is user is valid
export const checkUserIsValid = (user: TUser | null) => {

    if (!user) {
        sendError(HttpStatus.NOT_FOUND, 'user not found!');
    }

    if (user?.isDeleted) {
        sendError(HttpStatus.FORBIDDEN, 'This User is deleted.');
    }

    if (user?.userStatus === userStatus.blocked) {
        sendError(HttpStatus.FORBIDDEN, 'This User is Blocked.');
    }

    return true;

};