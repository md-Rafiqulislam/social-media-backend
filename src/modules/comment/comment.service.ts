
// all the imports here
import { commentModel } from "./comment.model";
import { TComment } from "./comment.type";

// create comment in the db
const createPostIntoDb = async (payload: TComment) => {

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

// all the comment services
export const commentServices = {
    createPostIntoDb,
    getAllCommentsByPostFromDb,
};