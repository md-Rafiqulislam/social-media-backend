
// all the imports here
import { HttpStatus } from "http-status-ts";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { postServices } from "./post.service";
import { sendError } from "../../errors/appError";
import { JwtPayload } from "jsonwebtoken";


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


// get all posts by user
const getAllPostByUser = catchAsync(async (req, res) => {

    // check user and params
    if (req.user.userId !== req.params.userId) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    // get posts
    const result = await postServices.getAllPostByUserFromDb(req.params.userId as string);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'All Posts retrieved successfully.',
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

    await postServices.deletePostByUserFromDb(req.user as JwtPayload, req.params.postId);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'Post Deleted successfully.',
        data: null,
    });
});


// visibility change
const postVisibilityChange = catchAsync(async (req, res) => {
    const result = await postServices.postVisibilityChangeByUserIntoDb(req.user as JwtPayload, req.params.postId as string, req.body as any);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'Post visibility change successfully.',
        data: result,
    });
});


// all the post controllers
export const postControllers = {
    createPost,
    getAllPost,
    getAllPostByUser,
    updatePost,
    deletePostByUser,
    postVisibilityChange,
};