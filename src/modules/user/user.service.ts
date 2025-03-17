
// all the imports here
import { sendError } from "../../errors/appError";
import { userRole } from "./user.constant";
import { userModel } from "./user.model";
import { TUser } from "./user.type";


// create user into db
const createUserIntoDb = async (payload: TUser) => {
    // set user role to user
    const newPayload = { ...payload, userRole: userRole.user };

    // create user
    const result = await userModel.create(newPayload);
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
const deleteUserIntoDb = async () => {

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

// all the user services
export const userServices = {
    createUserIntoDb,
    createAdminIntoDb,
    updateUserIntoDb,
    updateAdminIntoDb,
    deleteUserIntoDb,
};