
// all the imports here
import { JwtPayload } from "jsonwebtoken";
import { TUserInfo } from "./userInfo.type";
import { userInfoModel } from "./userInfo.model";


// create user info in the db
const createUserInfoIntoDb = async (userPayload: JwtPayload, payload: Partial<TUserInfo>) => {
    const result = await userInfoModel.create(payload);
    return result;
};


// export all the userInfo services
export const userInfoServices = {
    createUserInfoIntoDb,
};