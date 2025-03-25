
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../../errors/appError";
import { catchAsync } from "../../utils/catchAsync";
import { pageServices } from "./page.service";
import { sendResponse } from "../../utils/sendResponse";


// create page 
const createpage = catchAsync(async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        sendError(HttpStatus.NOT_FOUND, 'Token Not Found.');
    }

    const pageInfo = req.body;

    if (!pageInfo || Object.keys(pageInfo).length === 0) {
        sendError(HttpStatus.BAD_REQUEST, 'All the page information is not given.');
    }

    const result = await pageServices.createpageIntoDb(token as string, pageInfo);

    // send response to the client
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        message: 'Page created successfully.',
        data: result,
    });
});


// upadate page
const updatePage = async () => { };


// delete page
const deletePage = async () => { };


// all the page controllers
export const pageControllers = {
    createpage,
    updatePage,
    deletePage,
};