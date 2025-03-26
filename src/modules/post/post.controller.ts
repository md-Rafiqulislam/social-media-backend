
// all the imports here
import { HttpStatus } from "http-status-ts";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { postServices } from "./post.service";
import { sendError } from "../../errors/appError";


// create post
const createPost = catchAsync(async (req, res) => {

    // get the user and check
    const user = req.user;
    if (!user) {
        sendError(HttpStatus.NOT_FOUND, 'User not found.');
    }

    const result = await postServices.createPostIntoDb(user, req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        message: 'Post created successfully.',
        data: result,
    });
});


// get all post
const getAllPost = catchAsync(async (req, res) => {
    // console.log(req.path);
    const result = await postServices.getAllPostFromDb();

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'All post retrived successfully.',
        data: result,
    });
});


// update post
const updatePost = catchAsync(async (req, res) => {

    // get the user and check
    const user = req.user;
    if (!user) {
        sendError(HttpStatus.NOT_FOUND, 'User not found.');
    }

    const result = await postServices.updatePostIntoDb(user, req.params.postId, req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'Post updated successfully.',
        data: result,
    });
});


// delete post
const deletePostByUser = catchAsync(async (req, res) => {

    // get the user and check
    const user = req.user;
    if (!user) {
        sendError(HttpStatus.NOT_FOUND, 'User not found.');
    }

    await postServices.deletePostByUserFromDb(user, req.params.postId);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'Post Deleted successfully.',
        data: null,
    });
});


// all the post controllers
export const postControllers = {
    createPost,
    getAllPost,
    updatePost,
    deletePostByUser,
};