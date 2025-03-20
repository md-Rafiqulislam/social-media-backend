
// all the imports here
import { userGender, userRole, userStatus } from "./user.constant";

// user role type
export type TUserRole = keyof typeof userRole;

// user gender type
export type TUserGender = keyof typeof userGender;

// use status type
export type TUserStatus = keyof typeof userStatus;

// user type 
export type TUser = {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    gender: TUserGender;
    userRole?: TUserRole;
    userStatus?: TUserStatus;
    isDeleted?: boolean;
};