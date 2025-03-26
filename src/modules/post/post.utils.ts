
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../../errors/appError";
import { TPost } from "./post.type";

// check post is valid
export const checkPostIsValid = (post: TPost | null) => {

    let retrunValue: boolean = true;
    if (!post) {
        retrunValue = false;
        sendError(HttpStatus.NOT_FOUND, 'Post Not Found.');
    }

    if (post?.isDeleted) {
        retrunValue = false;
        sendError(HttpStatus.FORBIDDEN, 'Post is already deleted.');
    }

    return retrunValue;
};