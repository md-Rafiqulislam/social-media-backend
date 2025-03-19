
// all the imports here
import { sendError } from "../../errors/appError";
import { userRole, userStatus } from "./user.constant";
import { userModel } from "./user.model";
import { TUser } from "./user.type";


// create user into db
const createUserIntoDb = async (payload: TUser) => {
    // set user role to user
    const newPayload = { ...payload, userRole: userRole.user, userStatus: userStatus.active };

    // check all the data is given
    if (newPayload?.email || newPayload?.name || newPayload?.gender || newPayload?.password) {
        sendError(404, 'All the user information is not given!!!');
    }

    // create user
    const result = await userModel.create(newPayload);
    const { name, email } = result;
    return {
        name,
        email,
    };
};


// get user from db as get me route
const getUserFromDb = async (payload: string) => {

    // find the user
    const result = await userModel.findOne({ email: payload }).select('-password');

    // if user not found
    if (!result) {
        sendError(404, 'requested user not found!!!');
    }

    // if user is deleted
    if (result?.isDeleted) {
        sendError(400, 'user is allready deleted.');
    }

    // is user is blocked
    if (result?.userStatus === userStatus.blocked) {
        sendError(400, 'user is blocked.');
    }

    return result;
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
    // set user role to user
    const newPayload = { ...payload, userRole: userRole.admin };

    // create admin
    const result = await userModel.create(newPayload);
    return result;
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