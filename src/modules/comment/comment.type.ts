
// all the imports here
import { Types } from "mongoose";

// comment type
export type TComment = {
    content: string;
    userId: Types.ObjectId;
    postId: Types.ObjectId;
    isDeleted?: boolean;
};