
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../../errors/appError";
import { catchAsync } from "../../utils/catchAsync";
import { pageServices } from "./page.service";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";


// create page 
const createpage = catchAsync(async (req, res) => {

    // check user and page info
    if (req.user.userId !== req.body.user) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    };

    const result = await pageServices.createpageIntoDb(req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        message: 'Page created successfully.',
        data: result,
    });
});


// upadate page
const updatePage = catchAsync(async (req, res) => {
    

    const result = await pageServices.updatePageIntoDb(req.user as JwtPayload, req.params.pageId as string, req.body);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'Post is updated successfully',
        data: result,
    });
});


// delete page
const deletePage = catchAsync(async (req, res) => {
    const { pageId } = req.params;
    if (!pageId) {
        sendError(HttpStatus.NOT_FOUND, 'Page Id is not given.');
    }

    await pageServices.deletePageFromDb(pageId);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        message: 'Page deleted successfully.',
        data: null,
    });
});


// all the page controllers
export const pageControllers = {
    createpage,
    updatePage,
    deletePage,
};