
// all the imports here
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authServices } from "./auth.service";


// log in user
const loginUser = catchAsync(async (req, res) => {
    const result = await authServices.loginUserIntoDb(req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'user logged in successfully.',
        data: result,
    });
});

// export all the auth controllers
export const authControllers = {
    loginUser,
};