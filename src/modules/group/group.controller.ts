
// all the improts here
import { HttpStatus } from "http-status-ts";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { groupServices } from "./group.service";


// create group
const createGroup = catchAsync(async (req, res) => {
    const result = await groupServices.createGroupIntoDb(req.body);

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