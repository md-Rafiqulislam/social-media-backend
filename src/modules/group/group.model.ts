
// all the imports here
import { Schema, model } from "mongoose";
import { groupUserType, groupVisible } from "./group.constant";
import { TGroup, TGroupMember } from "./group.type";


// group member schema
const groupMemberSchema = new Schema<TGroupMember>({
    userType: {
        type: String,
        enum: Object.values(groupUserType),
        default: groupUserType.user,
        required: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'User Id is required.'],
        ref: 'User',
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: false,
    },
});


// group  schema
const groupSchema: Schema = new Schema<TGroup>({
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User Id is required.'],
        ref: "User"
    },
    groupName: {
        type: String,
        required: [true, 'Group Title is required.'],
    },
    groupDescription: {
        type: String,
        required: [true, 'Group Description is required.'],
    },
    groupVisible: {
        type: String,
        enum: Object.values(groupVisible),
        required: false,
        default: groupVisible.public,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: false,
    },
    isFavourite: {
        type: Boolean,
        default: false,
        required: false,
    },
    members: {
        type: [groupMemberSchema],
        required: false,
    },
});


// create group model and Export the model
export const groupModel = model<TGroup>("Group", groupSchema);