
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../../errors/appError";
import { TPost } from "./post.type";

// check post is valid
export const checkPostIsValid = (post: TPost | null) => {
    if (!post) {
        sendError(HttpStatus.NOT_FOUND, 'Post Not Found.');
    }

    if (post?.isDeleted) {
        sendError(HttpStatus.FORBIDDEN, 'Post is already deleted.');
    }
    return true;
};