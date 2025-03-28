
// all the imports here
import { HttpStatus } from "http-status-ts";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { commentServices } from "./comment.service";
import { sendError } from "../../errors/appError";
import { JwtPayload } from "jsonwebtoken";


// create comment
const createComment = catchAsync(async (req, res) => {

    // check the user and comment body
    if (req.user.userId !== req.body.user) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    // get the result
    const result = await commentServices.createCommentIntoDb(req.body);

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


// delete comment by user
const deleteCommentByUser = catchAsync(async (req, res) => {

    const result = await commentServices.deleteCommentByUserFromDb(req.user as JwtPayload, req.params.commentId as string);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'Comment deleted successfully',
        data: result,
    });
});


// delete commment by post user
const deleteCommentByPostUser = catchAsync(async (req, res) => {

    const user = req.user;
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const result = await commentServices.deleteCommentByPostUserFromDb(user as JwtPayload, postId as string, commentId as string);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'Comment deleted successfully.',
        data: result,
    });
});


// all the comment controllers
export const commentControllers = {
    createComment,
    getComments,
    deleteCommentByUser,
    deleteCommentByPostUser,
};