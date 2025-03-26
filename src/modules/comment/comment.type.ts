
// all the imports here
import { Types } from "mongoose";

// comment type
export type TComment = {
    content: string;
    user: Types.ObjectId;
    post: Types.ObjectId;
    isDeleted?: boolean;
};