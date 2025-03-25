
// all the imports here
import { Types } from "mongoose";
import { visibility } from "./page.constant";

// page visibility type
export type TPageVisibility = keyof typeof visibility;

// page type
export type TPage = {
    title: string;
    description: string;
    pageType: string;
    userId: Types.ObjectId;
    visibility?: TPageVisibility;
    isFavourite?: boolean;
    isDeleted?: boolean;
}