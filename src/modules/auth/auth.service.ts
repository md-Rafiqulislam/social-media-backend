
// all the imports here
import { HttpStatus } from "http-status-ts";
import { envFile } from "../../envConfig";
import { sendError } from "../../errors/appError";
import { userModel } from "../user/user.model";
import { TJwtPayload, TLogin } from "./auth.type";
import { createToken } from "./auth.utils";
import { userStatus } from "../user/user.constant";
import { checkUserIsValid } from "./auth.subService";


// login user into db
const loginUserIntoDb = async (payload: TLogin) => {

    // // check the login information is given
    // if (!payload?.email) {
    //     sendError(400, 'user email is required.');
    // } else if (!payload?.password) {
    //     sendError(400, 'user password is required.');
    // }

    // // find the user from db
    // const result = await userModel.findOne({ email: payload?.email });

    // // check the result is correct or not
    // if (!result) {
    //     sendError(404, 'user not found!!!');
    // } else if (result?.password !== payload?.password) {
    //     sendError(400, 'invalid password!!!');
    // } else if (result?.isDeleted) {
    //     sendError(400, 'user is deleted.');
    // } else {

    //     const jwtPayload: TJwtPayload = {
    //         userId: result._id,
    //         userRole: result.userRole,
    //     };

    //     const name = result?.name;

    //     const accessToken = createToken(jwtPayload, envFile.accessTokenSecret, envFile.accessTokenExpire);
    //     const refreshToken = createToken(jwtPayload, envFile.accessTokenSecret, envFile.accessTokenExpire);


    //     return {
    //         accessToken,
    //         refreshToken,
    //         name,
    //     };
    // }

    const user = await userModel.findOne({ email: payload.email });
    
    // if (!user) {
    //     sendError(HttpStatus.NOT_FOUND, 'user not found!');
    // }

    // if (user?.isDeleted) {
    //     sendError(HttpStatus.FORBIDDEN, 'This User is deleted.');
    // }

    // if (user?.userStatus === userStatus.blocked) {
    //     sendError(HttpStatus.FORBIDDEN, 'This User is Blocked.');
    // }

    const checkedUser = checkUserIsValid(user);


    if (checkedUser) {
        if (user?.password !== payload.password) {
            sendError(HttpStatus.FORBIDDEN, 'You are unauthorized. Invalid password!!');
        }
    }

    return {};

};


// export all the auth services
export const authServices = {
    loginUserIntoDb
};