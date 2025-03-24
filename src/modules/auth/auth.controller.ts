
// all the imports here
import { HttpStatus } from "http-status-ts";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import { envFile } from "../../envConfig";


// log in user
const loginUser = catchAsync(async (req, res) => {
    const result = await authServices.loginUserIntoDb(req.body);

    const { refreshToken, accessToken, firstName } = result;

    // save refresh token in cookie
    res.cookie('social-media-refreshToken', refreshToken, {
        secure: envFile.nEnv !== 'development',
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

// export all the auth controllers
export const authControllers = {
    loginUser,
    getAccessToken,
};