
// all the imports here
import { Types } from "mongoose";
import { groupUserType, groupVisible } from "./group.constant";


// group visible type
export type TGroupVisible = keyof typeof groupVisible;


// group user type
export type TGroupUserType = keyof typeof groupUserType;


// member type
export type TGroupMember = {
    userType?: TGroupUserType;
    userId: Types.ObjectId;
    isDeleted?: boolean;
};


// group type
export type TGroup = {
    user: Types.ObjectId;
    groupName: string;
    groupDescription: string;
    groupVisible?: TGroupVisible;
    isDeleted?: boolean;
    isFavourite?: boolean;
    members?: TGroupMember[];
};