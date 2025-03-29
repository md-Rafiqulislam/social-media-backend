
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../../errors/appError";
import { commentModel } from "./comment.model";
import { TComment } from "./comment.type";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { envFile } from "../../envConfig";
import { userModel } from "../user/user.model";
import { checkUserIsValid } from "../auth/auth.subService";
import { postModel } from "../post/post.model";
import { checkPostIsValid } from "../post/post.utils";
import { checkCommentIsValid } from "./comment.utils";

// create comment in the db
const createCommentIntoDb = async (payload: TComment) => {

    // get the post
    const post = await postModel.findById({ _id: payload.post });

    // check the post
    const checkedPost = checkPostIsValid(post);
    if (!checkedPost) {
        sendError(HttpStatus.FORBIDDEN, 'Can not Comment the Post.');
    }

    // new paylod                                   
    const newPayload = { ...payload, isDeleted: false };

    // create comment
    const result = await commentModel.create(newPayload);
    return result;
}


// get all the comments for single post from bd
const getAllCommentsByPostFromDb = async (payload: string) => {
    const comments = await commentModel.find({ post: payload, isDeleted: false }).populate("user", "firstName lastName");
    return comments;
};


// delete comment
const deleteCommentByUserFromDb = async (userPayload: JwtPayload, commentId: string) => {

    // find the comment
    const comment = await commentModel.findById({ _id: commentId });

    // check the comment
    const checkedComment = checkCommentIsValid(comment);
    if (!checkedComment) {
        sendError(HttpStatus.BAD_REQUEST, 'Comment is unavailable to delete.');
    }

    // check user of the comment
    if (String(comment?.user) !== userPayload.userId) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    // update comment as deleted
    await commentModel.findByIdAndUpdate({ _id: commentId }, { isDeleted: true }, { new: true });
    return null;
};


// delete comment by post user into db
const deleteCommentByPostUserFromDb = async (userpayload: JwtPayload, postId: string, commentId: string) => {
    // find the comment 
    const comment = await commentModel.findById({ _id: commentId });

    // check the comment
    const checkedComment = checkCommentIsValid(comment);
    if (!checkedComment) {
        sendError(HttpStatus.FORBIDDEN, 'Unable to delete comment.');
    }

    if (String(comment?.post) !== postId) {
        sendError(HttpStatus.FORBIDDEN, 'Unable to delete comment.');
    }

    // find the post
    const post = await postModel.findById({ _id: comment?.post });

    // check the post is valid
    const checkedPost = checkPostIsValid(post);
    if (!checkedPost) {
        sendError(HttpStatus.FORBIDDEN, 'Unable to find the post for comment delete.');
    }

    if (String(post?.user)! == userpayload.userId) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    if (String(post?._id) !== postId) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    await commentModel.findByIdAndUpdate({ _id: commentId }, { isDeleted: true }, { new: true });
    return commentId;
};


// all the comment services
export const commentServices = {
    createCommentIntoDb,
    getAllCommentsByPostFromDb,
    deleteCommentByUserFromDb,
    deleteCommentByPostUserFromDb,
};