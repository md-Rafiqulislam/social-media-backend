
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../../errors/appError";
import { postModel } from "./post.model";
import { TPost } from "./post.type";
import { checkPostIsValid } from "./post.utils";
import { JwtPayload } from "jsonwebtoken";
import { visibility } from "../page/page.constant";
import mongoose from "mongoose";
import { commentModel } from "../comment/comment.model";


// create post into db
const createPostIntoDb = async (user: JwtPayload, payload: TPost) => {

    if (user.userId !== payload.user) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    // set isDeleted false
    const newPayload = { ...payload, isDeleted: false };

    // create post
    const result = await postModel.create(newPayload);
    if (!result) {
        sendError(HttpStatus.BAD_REQUEST, 'Post can not created.');
    }
    return result;
};


// get all the posts from db
const getAllPostFromDb = async () => {
    const result = await postModel.find({ isDeleted: false, visibility: visibility.public });
    if (!result) {
        sendError(HttpStatus.BAD_REQUEST, 'Posts can not retrieved successfully.');
    }
    return result;
};


// get all post by user from db
const getAllPostByUserFromDb = async (user: JwtPayload, userId: string) => {
    const posts = await postModel.find({ user: userId, isDeleted: false });
    return posts;
};


// upadate post into db
const updatePostIntoDb = async (payloadUser: JwtPayload, postId: string, payload: Partial<TPost>) => {

    // check the post is exists
    const post = await postModel.findOne({ _id: postId });

    // check the post is valid
    const checkedPost = checkPostIsValid(post);
    if (!checkedPost) {
        sendError(HttpStatus.FORBIDDEN, 'Post can not updated.');
    }

    if (String(post?.user) !== payloadUser.userId) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    // update payload
    const { isDeleted, user, ...newPayload } = payload;

    // update post
    const result = await postModel.findOneAndUpdate({ _id: postId }, newPayload, { new: true });

    // check if post is updated or not
    if (!result) {
        sendError(HttpStatus.BAD_REQUEST, 'post can not updated!!!');
    }

    // return result;
    return result;
};


// delete post in the db
const deletePostByUserFromDb = async (userPayload: JwtPayload, postId: string) => {

    // get the post
    const post = await postModel.findById({ _id: postId });

    // check the post is valid
    const checkedPost = checkPostIsValid(post);
    if (!checkedPost) {
        sendError(HttpStatus.FORBIDDEN, 'Post can not deleted.');
    }

    if (String(post?.user) !== userPayload.userId) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    // start a session to operate multiple operations
    const session = await mongoose.startSession();

    try {
        // start the first trasaction
        session.startTransaction();

        // first transaction
        await postModel.findByIdAndUpdate({ _id: postId }, { isDeleted: true }, { new: true, session });

        // second transaction
        await commentModel.updateMany({ post: postId }, { isDeleted: true }, { new: true, session });
    } catch (error) {
        await session.abortTransaction();
        sendError(HttpStatus.CONFLICT, 'Unable to delete Post.');
    } finally {
        await session.endSession();
        return null;
    }

};


// all the post services
export const postServices = {
    createPostIntoDb,
    getAllPostFromDb,
    getAllPostByUserFromDb,
    updatePostIntoDb,
    deletePostByUserFromDb,
};