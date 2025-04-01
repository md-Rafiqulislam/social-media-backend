
// all the imports here
import { JwtPayload } from "jsonwebtoken";
import { TUserInfo } from "./userInfo.type";


// create user info in the db
const createUserInfoIntoDb = async (userPayload: JwtPayload, payload: Partial<TUserInfo>) => {

};


// export all the userInfo services
export const userInfoServices = {
    createUserInfoIntoDb,
};