
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../../errors/appError";
import { userRole, userStatus } from "./user.constant";
import { userModel } from "./user.model";
import { TUser } from "./user.type";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { envFile } from "../../envConfig";
import { checkUserIsValid } from "../auth/auth.subService";


// create user into db
const createUserIntoDb = async (payload: TUser) => {
    // set user role to user
    const newPayload = { ...payload, userRole: userRole.user, userStatus: userStatus.active, isDeleted: false };

    // check all the data is given
    if (!newPayload?.email || !newPayload?.firstName || !newPayload?.gender || !newPayload?.password) {
        sendError(HttpStatus.BAD_REQUEST, 'All the user information is not given!!!');
    }

    // create user
    const result = await userModel.create(newPayload);

    // get the full name for return
    const name = result?.firstName + ' ' + (result?.lastName ?? '');
    return {
        name: name.trim(),
    };
};


// get user from db as get me route
const getUserFromDb = async (userPayload: JwtPayload) => {
    // find the user
    const user = await userModel.findOne({ email: userPayload.email }).select('-password');
    return user;
};


// update user into db
const updateUserIntoDb = async (userPayload: JwtPayload, payload: Partial<TUser>) => {
    // set user update data to user
    const { isDeleted, userStatus, userRole, password, ...newPayload } = { ...payload };

    // update user
    const result = await userModel.findOneAndUpdate({ email: userPayload.email, }, newPayload, { new: true }).select('-password');
    return result;
};


// delete user into db
const deleteUserIntoDb = async (userPayload: JwtPayload) => {

    await userModel.findOneAndUpdate({ email: userPayload.email }, { isDeleted: true }, { new: true });
    return null;
};


// create admin into db
const createAdminIntoDb = async (payload: TUser) => {
    // set user role to admin
    const newPayload = { ...payload, userRole: userRole.admin, userStatus: userStatus.active, isDeleted: false };

    // check all the data is given
    if (!newPayload?.email || !newPayload?.firstName || !newPayload?.gender || !newPayload?.password) {
        sendError(404, 'All the user information is not given!!!');
    }

    // create admin
    const result = await userModel.create(newPayload);

    // get the full name to return
    const name = result?.firstName + ' ' + (result?.lastName ?? '');
    return {
        name: name.trim(),
    };
};


// all the user services
export const userServices = {
    createUserIntoDb,
    getUserFromDb,
    createAdminIntoDb,
    updateUserIntoDb,
    deleteUserIntoDb,
};