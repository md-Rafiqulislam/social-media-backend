
// all the imports here
import { Types } from "mongoose";
import { visibilityOptions } from "./post.constant";

// visibilityOptions type
export type TVisibilityOptions = keyof typeof visibilityOptions;

// post type
export type TPost = {
    postTitle: string;
    postDescription: string;
    userId: Types.ObjectId;
    isFavourite?: boolean;
    visibility?: TVisibilityOptions;
    isDeleted?: boolean;
};