
// all the imports here
import { HttpStatus } from "http-status-ts";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.service";
import { sendError } from "../../errors/appError";
import { JwtPayload } from "jsonwebtoken";


// create user
const createUser = catchAsync(async (req, res) => {
    const result = await userServices.createUserIntoDb(req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: 'User created successfully.',
        data: result,
    });
});


// get user get me route
const getUser = catchAsync(async (req, res) => {

    const result = await userServices.getUserFromDb(req.user as JwtPayload);

    // send the response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'User retrived successfuly.',
        data: result,
    });
});


// update user
const updateUser = catchAsync(async (req, res) => {

    const result = await userServices.updateUserIntoDb(req.user as JwtPayload, req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully.',
        data: result,
    });
});


// delete user
const deleteUser = catchAsync(async (req, res) => {

    await userServices.deleteUserIntoDb(req.user as JwtPayload);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully.',
        data: null,
    });
});


// create admin
const createAdmin = catchAsync(async (req, res) => {
    const result = await userServices.createAdminIntoDb(req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        message: 'Admin Created successfully.',
        data: result,
    });
});


// block the user
const blockUser = catchAsync(async (req, res) => {

    // check the params and data
    if(req.params.userId !== req.body.userId) {
        sendError(HttpStatus.CONFLICT, 'params user id and send user id is not matched.');
    }

    const result = await userServices.blockUserIntoDb(req.params.userId as string);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'Blocked this user successfully.',
        data: result,
    });
});


// delete the user
const deleteUserByAdmin = catchAsync(async (req, res) => {

    // check the params and data
    if(req.params.userId !== req.body.userId) {
        sendError(HttpStatus.CONFLICT, 'params user id and send user id is not matched.');
    }

    const result = await userServices.blockUserIntoDb(req.params.userId as string);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'Deleted this user successfully.',
        data: result,
    });
});


// convert the user to admin by admin
const convertUserToAdminByAdmin = catchAsync(async (req, res) => {

    // check the params and data
    if(req.params.userId !== req.body.userId) {
        sendError(HttpStatus.CONFLICT, 'Params User id and send User Id is not matched.');
    }

    const result = await userServices.convertUserToAdminByAdminIntoDb(req.params.userId as string);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'Make this User to Admin successfully.',
        data: result,
    });
});


// all the user controllers
export const userControllers = {
    createUser,
    getUser,
    createAdmin,
    updateUser,
    deleteUser,
    blockUser,
    deleteUserByAdmin,
    convertUserToAdminByAdmin,
};