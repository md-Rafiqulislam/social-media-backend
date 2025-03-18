
// all the imports here
import { envFile } from "../../envConfig";
import { sendError } from "../../errors/appError";
import { userModel } from "../user/user.model";
import { TLogin } from "./auth.type";
import { createToken } from "./auth.utils";


// login user into db
const loginUserIntoDb = async (payload: TLogin) => {

    // check the login information is given
    if (!payload?.email) {
        sendError(400, 'user email is required.');
    } else if (!payload?.password) {
        sendError(400, 'user password is required.');
    }

    // find the user from db
    const result = await userModel.findOne({ email: payload?.email }).select("_id email userRole");

    // check the result is correct or not
    if (!result) {
        sendError(404, 'user not found!!!');
    } else if (result?.password !== payload?.password) {
        sendError(400, 'invalid password!!!');
    } else if (result?.isDeleted) {
        sendError(400, 'user is deleted.');
    }


    const accessToken = createToken({ userId: result?._id, userRole: result?.userRole }, envFile.accessTokenSecret, envFile.accessTokenExpire);

    return result;
};


// export all the auth services
export const authServices = {
    loginUserIntoDb
};