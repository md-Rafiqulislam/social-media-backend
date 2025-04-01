
// all the imports here
import { Types } from "mongoose";
import { groupVisible } from "./group.constant";


// group visible type
export type TGroupVisible = keyof typeof groupVisible;


// group type
export type TGroup = {
    user: Types.ObjectId;
    groupName: string;
    groupDescription: string;
    groupVisible?: TGroupVisible;
    isDeleted?: boolean;
    isFavourite?: boolean;
};