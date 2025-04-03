
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../../errors/appError";
import { JwtPayload } from "jsonwebtoken";
import { TReaction } from "./reaction.type";
import { postModel } from "../post/post.model";
import { checkPostIsValid } from "../post/post.utils";
import { reactionModel } from "./reaction.model";


// create raction for post into db
const createReactionForPostIntoDb = async (postId: string, userPayload: JwtPayload, payload: TReaction) => {

    // find the post
    const post = await postModel.findById({ _id: postId });

    // check the post
    const checkedPost = checkPostIsValid(post);
    if (!checkedPost) {
        sendError(HttpStatus.BAD_GATEWAY, 'This Post is not valid for reaction.');
    }

    // get the desired post for reaction
    const reactionPost = await reactionModel.findOne({ post: postId });

    // check the reaction post
    if (!reactionPost) {
        sendError(HttpStatus.NOT_FOUND, 'Post is not found for reaction.');
    }

    if (reactionPost?.isDone) {
        sendError(HttpStatus.BAD_REQUEST, 'This is already reacted.');
    }

    // new payload
    const newPayload = { ...payload, isDone: true };

    const result = await reactionModel.findOneAndUpdate({ post: postId }, newPayload, { new: true });

    return result;
};


// all the reaction services
export const ractionServices = {
    createReactionForPostIntoDb,
};