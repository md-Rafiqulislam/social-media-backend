
// all the imports here
import { HttpStatus } from "http-status-ts";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { sendError } from "../../errors/appError";
import { JwtPayload } from "jsonwebtoken";
import { ractionServices } from "./reaction.service";


// create reaction for post
const createReactionForPost = catchAsync(async (req, res) => {

    // get the user and check
    if (!req.user) {
        sendError(HttpStatus.NOT_FOUND, 'User not found.');
    }

    if (req.user.userId !== req.body.user) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    if (req.params.postId !== req.body.post) {
        sendError(HttpStatus.NO_CONTENT, 'Post is not found.');
    }

    const result = await ractionServices.createReactionForPostIntoDb(req.params.postId as string, req.user as JwtPayload, req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        message: 'Reaction added for post successfully.',
        data: result,
    });
});



// all the reaction controllers
export const reactionControllers = {
    createReactionForPost,
};