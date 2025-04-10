
// all the imports here
import { HttpStatus } from "http-status-ts";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import { envFile } from "../../envConfig";
import { JwtPayload } from "jsonwebtoken";


// log in user
const loginUser = catchAsync(async (req, res) => {
    const result = await authServices.loginUserIntoDb(req.body);

    const { refreshToken, accessToken, firstName } = result;

    // save refresh token in cookie
    res.cookie('refreshToken', refreshToken, {
        secure: envFile.nEnv === 'production',
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'User Logged in successfully.',
        data: {
            accessToken,
            firstName,
        },
    });
});


const getAccessToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await authServices.getAccessTokenByRefreshToken(refreshToken);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'Access Token retrieved successfully.',
        data: result,
    });
});


// change old password
const changePassword = catchAsync(async (req, res) => {
    const result = await authServices.changeOldPasswordIntoDb(req.user as JwtPayload, req.body);

    
    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'User old password is changed successfully.',
        data: result,
    });
});


// export all the auth controllers
export const authControllers = {
    loginUser,
    getAccessToken,
    changePassword,
};