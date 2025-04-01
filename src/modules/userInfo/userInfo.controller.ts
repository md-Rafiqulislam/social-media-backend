
// all the imports here
import { HttpStatus } from "http-status-ts";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userInfoServices } from "./userInfo.service";
import { JwtPayload } from "jsonwebtoken";
import { sendError } from "../../errors/appError";


// create user info
const createUserInfo = catchAsync(async (req, res) => {

    // check the user id in req.body
    if (!req.body.user) {
        sendError(HttpStatus.NOT_FOUND, 'User is not found in requested body.');
    }

    const result = await userInfoServices.createUserInfoIntoDb(req.user as JwtPayload, req.body);

    // send the response to the client
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        message: 'User\'s info is created successfully.',
        data: result,
    });
});


// export all the user info controllers
export const userInfoControllers = {
    createUserInfo,
};