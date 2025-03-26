
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../../errors/appError";
import { TPage } from "./page.type";
import { pageModel } from "./page.model";
import { checkPageIsDeleted } from "./page.utils";


// create page into db
const createpageIntoDb = async (payload: TPage) => {

    const newPayload = { ...payload, isDeleted: false };

    const result = await pageModel.create(newPayload);

    return result;
};


// upadate page into db
const updatePageIntoDb = async (pageId: string, payload: Partial<TPage>) => {
    const page = await pageModel.findById({ _id: payload });

    const checkedPage = checkPageIsDeleted(page);

    if (!checkedPage) {
        sendError(HttpStatus.BAD_REQUEST, 'Bad request for update page.');
    }

    const result = await pageModel.findByIdAndUpdate({ _id: pageId }, payload, { new: true });
    return result;
};


// delete page in the db
const deletePageFromDb = async (pageId: string) => {
    const page = await pageModel.findById({ _id: pageId });

    const checkedPage = checkPageIsDeleted(page);

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