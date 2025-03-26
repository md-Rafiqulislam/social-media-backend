
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../../errors/appError";
import { TPage } from "./page.type";
import { pageModel } from "./page.model";
import { checkPageIsValid } from "./page.utils";
import { JwtPayload } from "jsonwebtoken";


// create page into db
const createpageIntoDb = async (payload: TPage) => {

    const newPayload = { ...payload, isDeleted: false };

    const result = await pageModel.create(newPayload);

    return result;
};


// upadate page into db
const updatePageIntoDb = async (userPayload: JwtPayload, pageId: string, payload: Partial<TPage>) => {

    // find the page
    const page = await pageModel.findById({ _id: pageId });

    // check the page
    const checkedPage = checkPageIsValid(page);
    if (!checkedPage) {
        sendError(HttpStatus.BAD_REQUEST, 'Bad request for update page.');
    }

    if (String(page?.user) !== userPayload.userId) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    // new payload
    const { isDeleted, ...newPayload } = payload;

    const result = await pageModel.findByIdAndUpdate({ _id: pageId }, newPayload, { new: true });
    return result;
};


// delete page in the db
const deletePageFromDb = async (pageId: string) => {
    const page = await pageModel.findById({ _id: pageId });

    const checkedPage = checkPageIsValid(page);

    if (!checkedPage) {
        sendError(HttpStatus.BAD_REQUEST, 'Bad request for delete page');
    }

    await pageModel.findByIdAndUpdate({ _id: pageId }, { isDeleted: true }, { new: true });
    return null
};


// all the page services
export const pageServices = {
    createpageIntoDb,
    updatePageIntoDb,
    deletePageFromDb,
};