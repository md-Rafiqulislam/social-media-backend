
// all the imports here
import { userGender, userRole } from "./user.constant";

// user type 
export type TUser = {
    name: string;
    email: string;
    password: string;
    gender: userGender;
    userRole?: userRole;
    isDeleted?: boolean;
};