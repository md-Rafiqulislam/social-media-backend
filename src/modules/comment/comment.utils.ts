
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../../errors/appError";
import { TComment } from "./comment.type";

// check the comment is valid
export const checkCommentIsValid = (comment: TComment | null) => {
    let returnValue: boolean = true;

    // not found the comment
    if (!comment) {
        returnValue = false;
        sendError(HttpStatus.NOT_FOUND, 'Comment not found.');
    }

    if (comment?.isDeleted) {
        returnValue = false;
        sendError(HttpStatus.FORBIDDEN, 'Comment already deleted.');
    }

    return returnValue;
};