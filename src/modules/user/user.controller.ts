
// all the imports here
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.service";

// create user
const createUser = catchAsync(async (req, res) => {
    const result = await userServices.createUserIntoDb(req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'user created successfully.',
        data: result,
    });
});


// update user
const updateUser = catchAsync(async (req, res) => {
    const result = await userServices.updateUserIntoDb(req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'user updated successfully.',
        data: result,
    });
});


// delete user
const deleteUser = catchAsync(async (req, res) => {
    await userServices.deleteUserIntoDb(req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'user deleted successfully.',
        data: null,
    });
});


// create admin
const createAdmin = catchAsync(async (req, res) => {
    const result = await userServices.createAdminIntoDb(req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'admin created successfully.',
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

// all the user controllers
export const userControllers = {
    createUser,
    createAdmin,
    updateUser,
    updateAdmin,
    deleteUser,
};