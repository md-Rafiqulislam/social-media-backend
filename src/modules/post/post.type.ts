
// all the imports here
import { Types } from "mongoose";

// post type
export type TPost = {
    postTitle: string;
    postDescription: string;
    isFavourite?: boolean;
    isDeleted?: boolean;
    userId: Types.ObjectId;
};