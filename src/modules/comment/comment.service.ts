
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

// create comment in the db
const createCommentIntoDb = async (payload: TComment) => {

    // get the post
    const post = await postModel.findById({_id: payload.post});
    
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
    const comments = await commentModel.find({ postId: payload, isDelete: false }).populate("userId", "firstName lastName");
    return comments;
};


// delete comment
const deleteCommentByUserFromDb = async (token: string, commentId: string) => {

    // find the comment
    const comment = await commentModel.findById({ _id: commentId });

    // decode the access token
    const decoded = jwt.verify(token, envFile.accessTokenSecret);

    const { email, userId } = decoded as JwtPayload;

    // find the user
    const user = await userModel.findOne({ email }).select('-password');

    // check the user
    const checkedUser = checkUserIsValid(user);
    if (!checkedUser) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    // check the comment
    if (!comment) {
        sendError(HttpStatus.NOT_FOUND, 'Comment not found.');
    }

    if (comment?.isDeleted) {
        sendError(HttpStatus.FORBIDDEN, 'Comment is already deleted.');
    };

    if (String(comment?.user) !== userId) {
        sendError(HttpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    await commentModel.findByIdAndUpdate({ _id: commentId }, { isDeleted: true }, { new: true });
    return null;
};


// all the comment services
export const commentServices = {
    createCommentIntoDb,
    getAllCommentsByPostFromDb,
    deleteCommentByUserFromDb,
};