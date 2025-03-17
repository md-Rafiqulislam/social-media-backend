
// all the imports here
import { sendError } from "../../errors/appError";
import { postModel } from "./post.model";
import { TPost } from "./post.type";


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


// all the post services
export const postServices = {
    createPostIntoDb,
    updatePostIntoDb,
};