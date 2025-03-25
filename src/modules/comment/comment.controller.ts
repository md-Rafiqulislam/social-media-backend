
// all the imports here
import { HttpStatus } from "http-status-ts";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { commentServices } from "./comment.service";


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


// all the comment controllers
export const commentControllers = {
    createComment,
};