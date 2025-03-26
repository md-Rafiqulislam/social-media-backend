
// all the imports here
import { HttpStatus } from "http-status-ts";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { commentServices } from "./comment.service";
import { sendError } from "../../errors/appError";


// create comment
const createComment = catchAsync(async (req, res) => {
    const result = await commentServices.createPostIntoDb(req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        message: 'Comment created successfully.',
        data: result,
    });
});


// get comments by post
const getComments = catchAsync(async (req, res) => {
    const { postId } = req.params;

    if (!postId) {
        sendError(HttpStatus.BAD_REQUEST, 'Post Id is required.');
    }

    const result = await commentServices.getAllCommentsByPostFromDb(postId as string);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'All Comments retrieved sucessfully',
        data: result,
    });
});



// all the comment controllers
export const commentControllers = {
    createComment,
    getComments,
};