
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

    if (req.body.user !== req.user.userId) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    const result = await userInfoServices.createUserInfoIntoDb(req.user as JwtPayload, req.body);

    // send the response to the client
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        message: 'User\'s info is created successfully.',
        data: result,
    });
});


// update user info for a user
const getUserInfo = catchAsync(async (req, res) => {
    const result = await userInfoServices.getUserInfoFromDb(req.user);

    // send the response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'User\'s info is retrieved successfully.',
        data: result,
    });
});


// update user info
const updateUserInfo = catchAsync(async (req, res) => {

    // check the user id in req.body
    if (!req.body.user) {
        sendError(HttpStatus.NOT_FOUND, 'User is not found in requested body.');
    }

    if (req.body.user !== req.user.userId) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    const result = await userInfoServices.updateUserInfoIntoDb(req.user as JwtPayload, req.body);

    // send the response to the client
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        message: 'User\'s info is updated successfully.',
        data: result,
    });
});


// export all the user info controllers
export const userInfoControllers = {
    createUserInfo,
    getUserInfo,
    updateUserInfo,
};