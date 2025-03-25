
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

// all the comment services
export const commentServices = {
    createPostIntoDb,
};