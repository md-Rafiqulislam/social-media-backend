
// all the imports here
import { HttpStatus } from "http-status-ts";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { postServices } from "./post.service";

// create post
const createPost = catchAsync(async (req, res) => {
    const result = await postServices.createPostIntoDb(req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        message: 'Post created successfully.',
        data: result,
    });
});


// update post
const updatePost = catchAsync(async (req, res) => {
    const result = await postServices.updatePostIntoDb(req.params.postId, req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'post updated successfully.',
        data: result,
    });
});


// all the post controllers
export const postControllers = {
    createPost,
    updatePost,
};