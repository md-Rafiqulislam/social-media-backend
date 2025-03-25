
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
const getUserFromDb = async (payload: string) => {

    const decoded = jwt.verify(payload, envFile.accessTokenSecret);

    const { email } = decoded as JwtPayload;

    // find the user
    const user = await userModel.findOne({ email }).select('-password');

    const checkedUser = checkUserIsValid(user);
    
    // check the user is valid
    if(!checkedUser) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    // return the user
    return user;
};

// update user into db
const updateUserIntoDb = async (payload: Partial<TUser>) => {
    // set user role to user
    const newPayload = { ...payload, userRole: userRole.user };

    if (!newPayload?.email) {
        sendError(404, 'user email address is required.');
    }

    // get user
    const user = await userModel.findOne({ email: newPayload?.email });

    // if not user existist
    if (!user) {
        sendError(404, 'user not found!!!');
    }

    // update user
    const result = await userModel.findOneAndUpdate({ email: newPayload?.email }, newPayload, { new: true });
    return result;
};


// delete user into db
const deleteUserIntoDb = async (payload: string) => {
    const result = await userModel.findOneAndUpdate({ email: payload }, { isDeleted: true }, { new: true });
    return result;
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


// upadate admin into db
const updateAdminIntoDb = async (payload: TUser) => {
    // set user role to admin
    const newPayload = { ...payload, userRole: userRole.admin };
    if (!newPayload?.email) {
        sendError(404, 'user email address is required.');
    }
    // update admin
    const result = await userModel.findOneAndUpdate({ email: newPayload?.email }, newPayload, { new: true });
    return result;
};


// delete admin into db
const deleteAdminIntoDb = async (payload: string) => {

    // delete admin
    const result = await userModel.findOneAndUpdate({ email: payload }, { isDeleted: true }, { new: true });
    return result;
};

// all the user services
export const userServices = {
    createUserIntoDb,
    getUserFromDb,
    createAdminIntoDb,
    updateUserIntoDb,
    updateAdminIntoDb,
    deleteUserIntoDb,
    deleteAdminIntoDb,
};