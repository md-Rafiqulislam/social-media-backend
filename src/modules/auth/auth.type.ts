
// all the imports here
import { Types } from "mongoose";

// login type
export type TLogin = {
    email: string;
    password: string;
};

// jwt payload type
export type TJwtPayload = {
    userId: Types.ObjectId;
    email: string;
    userRole: string;
};