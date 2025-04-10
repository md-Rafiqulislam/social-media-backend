
// all the imports here
import { HttpStatus } from "http-status-ts";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { albumServices } from "./album.service";
import { sendError } from "../../errors/appError";
import { Types } from "mongoose";


// create album
const createAlbum = catchAsync(async (req, res) => {

    // check the user and the body
    if (req.user.userId !== req.body.user) {
        sendError(HttpStatus.BAD_REQUEST, 'You are not authorzied to create this album.');
    }

    const result = await albumServices.createAlbumIntoDb(req.body);

    // send the response to the client
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        message: 'Album created successfully.',
        data: result,
    });
});


// get album by user
const getAlbumByUser = catchAsync(async (req, res) => {

    // check the user and the body
    if (!Types.ObjectId.isValid(req.user.userId)) {
        sendError(HttpStatus.BAD_REQUEST, 'Invalid User ID.');
    }

    if (req.user.userId !== req.body.user) {
        sendError(HttpStatus.BAD_REQUEST, 'You are not authorzied to get this user album.');
    }

    const result = await albumServices.getAlbumByUserFromDb(req.body);

    // send the response to the client
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        message: 'All the Album retrieved successfully.',
        data: result,
    });
});


// get single album
const getSingleAlbumByUser = catchAsync(async (req, res) => {
    // check the user and the body
    if (!Types.ObjectId.isValid(req.user.userId)) {
        sendError(HttpStatus.BAD_REQUEST, 'Invalid User ID.');
    }

    if (req.user.userId !== req.body.user) {
        sendError(HttpStatus.BAD_REQUEST, 'You are not authorzied to get this user album.');
    }

    if (req.params.albumId !== req.body.albumId) {
        sendError(HttpStatus.BAD_REQUEST, 'Invalid Album Id.');
    }

    const result = await albumServices.getAlbumByUserFromDb(req.body.albumId as string);

    // send the response to the client
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        message: 'Album retrieved successfully.',
        data: result,
    });
});


// export all the album controllers
export const albumControllers = {
    createAlbum,
    getAlbumByUser,
    getSingleAlbumByUser,
};