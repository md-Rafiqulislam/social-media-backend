
// all the imports here
import { HttpStatus } from "http-status-ts";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.service";
import { sendError } from "../../errors/appError";

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

    // get the token
    const token = req.headers.authorization;

    // check the token is exists
    if (!token) {
        sendError(HttpStatus.UNAUTHORIZED, 'Token not found.');
    }

    const result = await userServices.getUserFromDb(token as string);

    // send the response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'User retrived successfuly.',
        data: result,
    });
});


// update user
const updateUser = catchAsync(async (req, res) => {

    // get the token
    const token = req.headers.authorization;

    // check the token
    if (!token) {
        sendError(HttpStatus.UNAUTHORIZED, 'Token not found.');
    }

    const result = await userServices.updateUserIntoDb(token as string, req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully.',
        data: result,
    });
});

// delete user
const deleteUser = catchAsync(async (req, res) => {

    // get token
    const token = req.headers.authorization;

    // check the token
    if (!token) {
        sendError(HttpStatus.UNAUTHORIZED, 'Token not found.');
    }

    await userServices.deleteUserIntoDb(token as string);

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

// update admin
const updateAdmin = catchAsync(async (req, res) => {
    const result = await userServices.updateAdminIntoDb(req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'admin updated successfully.',
        data: result,
    });
});


// delete admin
const deleteAdmin = catchAsync(async (req, res) => {
    const result = await userServices.deleteAdminIntoDb(req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'admin deleted successfully.',
        data: null,
    });
});

// all the user controllers
export const userControllers = {
    createUser,
    getUser,
    createAdmin,
    updateUser,
    updateAdmin,
    deleteUser,
    deleteAdmin,
};