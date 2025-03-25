
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../../errors/appError";
import { postModel } from "./post.model";
import { TPost } from "./post.type";
import { checkPostIsValid } from "./post.utils";


// create post into db
const createPostIntoDb = async (payload: TPost) => {

    // set isDeleted false
    const newPayload = { ...payload, isDeleted: false };

    // create post
    const result = await postModel.create(newPayload);
    return result;
};


// upadate post into db
const updatePostIntoDb = async (postId: string, payload: Partial<TPost>) => {

    // check the post is exists
    const post = await postModel.findOne({ _id: postId });

    // check the is valid
    const checkedPost = checkPostIsValid(post);
    if (!checkedPost) {
        sendError(HttpStatus.FORBIDDEN, 'Post can not updated.');
    }

    // update payload
    const { isDeleted, userId, ...newPayload } = { ...payload };

    // update post
    const result = await postModel.findOneAndUpdate({ _id: postId }, newPayload, { new: true });

    // check if post is updated or not
    if (!result) {
        sendError(HttpStatus.BAD_REQUEST, 'post can not updated!!!');
    }

    return result;
};


// delete post in the db
const deletePostFromDb = async (payload: string) => {

    // get the post
    const post = await postModel.findById({ _id: payload });

    // check the post is valid
    const checkedPost = checkPostIsValid(post);
    if (!checkedPost) {
        sendError(HttpStatus.FORBIDDEN, 'Post can not deleted.');
    }

    await postModel.findByIdAndUpdate({ _id: payload }, { isDeleted: true }, { new: true });
    return null;
};


// all the post services
export const postServices = {
    createPostIntoDb,
    updatePostIntoDb,
    deletePostFromDb,
};