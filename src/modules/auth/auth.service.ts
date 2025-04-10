
// all the imports here
import { HttpStatus } from "http-status-ts";
import { envFile } from "../../envConfig";
import { sendError } from "../../errors/appError";
import { userModel } from "../user/user.model";
import { TChangePassword, TJwtPayload, TLogin } from "./auth.type";
import { checkedPasswordMatched, createToken } from "./auth.utils";
import { checkUserIsValid } from "./auth.subService";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcrypt';


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
        userRole: userRole as string,
    }

    const accessToken = createToken(jwtPayload, envFile.accessTokenSecret, envFile.accessTokenExpire as number);
    const refreshToken = createToken(jwtPayload, envFile.refreshTokenSecret, envFile.refreshTokenExpire as number);

    return {
        accessToken,
        refreshToken,
        firstName: user?.firstName,
    };

};


// get access token by refresh token
const getAccessTokenByRefreshToken = async (payload: string) => {

    const decoded = jwt.verify(payload as string, envFile.refreshTokenSecret);

    const { email, iat } = decoded as JwtPayload;

    const user = await userModel.findOne({ email });
    const checkedUser = checkUserIsValid(user);

    if (!checkedUser) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }


    const jwtPayload: TJwtPayload = {
        userId: user?._id!,
        email: user?.email!,
        userRole: user?.userRole!,
    };

    const accessToken = createToken(jwtPayload, envFile.accessTokenSecret as string, envFile.accessTokenExpire as number);

    return {
        accessToken,
    };
};


// change user old password into db
const changeOldPasswordIntoDb = async (userPayload: JwtPayload, payload: TChangePassword) => {
    const { oldPassword, newPassword } = payload;

    // find the user
    const user = await userModel.findOne({ email: userPayload.email }).select('password');

    // check the password is matched
    const isPasswordMatched = await checkedPasswordMatched(oldPassword, String(user?.password));
    if (!isPasswordMatched) {
        sendError(HttpStatus.NOT_ACCEPTABLE, 'password is not matched.');
    }

    // /hash the new password
    const newHashedPassword = await bcrypt.hash(
        newPassword,
        Number(envFile.saltRounds),
    );

    // update the password
    await userModel.findOneAndUpdate({ email: userPayload.email }, { password: newHashedPassword }, { new: true });
    return null;
};


// export all the auth services
export const authServices = {
    loginUserIntoDb,
    getAccessTokenByRefreshToken,
    changeOldPasswordIntoDb,
};