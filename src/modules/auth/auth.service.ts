
// all the imports here
import { HttpStatus } from "http-status-ts";
import { envFile } from "../../envConfig";
import { sendError } from "../../errors/appError";
import { userModel } from "../user/user.model";
import { TJwtPayload, TLogin } from "./auth.type";
import { checkedPasswordMatched, createToken } from "./auth.utils";
import { checkUserIsValid } from "./auth.subService";


// login user into db
const loginUserIntoDb = async (payload: TLogin) => {

    const user = await userModel.findOne({ email: payload.email });

    const checkedUser = checkUserIsValid(user);

    if (!checkedUser) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    const isMatched = await checkedPasswordMatched(payload.password, user?.password as string);

    if (!isMatched) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized. Invalid password.');
    }

    const { _id, email, userRole } = user!;

    const jwtPayload: TJwtPayload = {
        userId: _id,
        email: email,
        userRole: userRole,
    }

    const accessToken = createToken(jwtPayload, envFile.accessTokenSecret, envFile.accessTokenExpire as number);
    const refreshToken = createToken(jwtPayload, envFile.refreshTokenSecret, envFile.refreshTokenExpire as number);

    return {
        accessToken,
        refreshToken,
        firstName: user?.firstName,
    };

};


// export all the auth services
export const authServices = {
    loginUserIntoDb
};