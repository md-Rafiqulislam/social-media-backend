
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../../errors/appError";
import { TPage } from "./page.type";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { envFile } from "../../envConfig";
import { userModel } from "../user/user.model";
import { checkUserIsValid } from "../auth/auth.subService";
import { pageModel } from "./page.model";


// create page into db
const createpageIntoDb = async (token: string, payload: TPage) => {
    const decoded = jwt.verify(token, envFile.accessTokenSecret);
    const { email } = decoded as JwtPayload;

    const user = await userModel.findOne({ email });

    const checkedUser = checkUserIsValid(user);

    if (!checkedUser) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    const newPayload = { ...payload, isDeleted: false };

    const result = await pageModel.create(newPayload);

    return result;
};


// upadate page into db
const updatePageIntoDb = async () => { };


// delete page in the db
const deletePageFromDb = async () => { };


// all the page services
export const pageServices = {
    createpageIntoDb,
    updatePageIntoDb,
    deletePageFromDb,
};