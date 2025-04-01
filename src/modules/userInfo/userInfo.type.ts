
// all the imports here
import { Types } from "mongoose";
import { userMaritalStatus } from "./userInfo.constant";


// user maritial status type
export type TUserMaritalStatus = keyof typeof userMaritalStatus;


// user info type
export type TUserInfo = {
    user: Types.ObjectId;
    userBio?: string;
    userNickName?: string;
    aboutUser?: string;
    maritalStatus?: TUserMaritalStatus;
    birthDate?: string;
};