
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../../errors/appError";
import { TPage } from "./page.type";

// check the page is deleted
export const checkPageIsDeleted = (page: TPage | null) => {

    let returnValue: boolean = true;

    if (!page) {
        returnValue = false;
        sendError(HttpStatus.NOT_FOUND, 'Page not found');
    }
    return returnValue;
};