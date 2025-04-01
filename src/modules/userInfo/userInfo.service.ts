
// all the imports here
import { JwtPayload } from "jsonwebtoken";
import { TUserInfo } from "./userInfo.type";
import { userInfoModel } from "./userInfo.model";


// create user info in the db
const createUserInfoIntoDb = async (userPayload: JwtPayload, payload: Partial<TUserInfo>) => {
    const result = await userInfoModel.create(payload);
    return result;
};


// get userinfo from db
const getUserInfoFromDb = async (userPayload: JwtPayload) => {
    const result = await userInfoModel.findOne({ user: userPayload.userId });
    return result;
};


// update user info in the db
const updateUserInfoIntoDb = async (userPayload: JwtPayload, payload: Partial<TUserInfo>) => {
    const result = await userInfoModel.findOneAndUpdate({ user: userPayload.userId }, payload, { new: true });
    return result;
};


// export all the userInfo services
export const userInfoServices = {
    createUserInfoIntoDb,
    getUserInfoFromDb,
    updateUserInfoIntoDb,
};