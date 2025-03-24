
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
    if (!post) {
        sendError(404, 'post can not found!!!');
    }

    // update post
    const result = await postModel.findOneAndUpdate({ _id: postId }, payload, { new: true });

    // check if post is updated or not
    if (!result) {
        sendError(500, 'post can not updated!!!');
    }

    return result;
};

// delete post in the db
const deletePostFromDb = async (payload: string) => {
    const post = await postModel.findById({ _id: payload });

    const checkedPost = checkPostIsValid(post);
    if (!checkedPost) {
        sendError(HttpStatus.FORBIDDEN, 'Post is not valid.');
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