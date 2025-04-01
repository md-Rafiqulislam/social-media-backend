
// all the improts here
import { HttpStatus } from "http-status-ts";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { groupServices } from "./group.service";
import { JwtPayload } from "jsonwebtoken";
import { sendError } from "../../errors/appError";


// create group
const createGroup = catchAsync(async (req, res) => {

    // check the group admin and created user
    if (!req.body.user) {
        sendError(HttpStatus.NOT_FOUND, 'User is not found for create group.');
    }

    if (req.user.userId !== req.body.user) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized to create this group.');
    }

    const result = await groupServices.createGroupIntoDb(req.user as JwtPayload, req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        message: 'Group created successfully.',
        data: result,
    });
});


// export all the group controllers
export const groupControllers = {
    createGroup,
};