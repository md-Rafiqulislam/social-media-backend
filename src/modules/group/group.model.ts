
// all the imports here
import { Schema, model } from "mongoose";
import { groupVisible } from "./group.constant";
import { TGroup } from "./group.type";


// group  schema
const groupSchema: Schema = new Schema<TGroup>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    groupName: {
        type: String,
        required: true
    },
    groupDescription: {
        type: String,
        required: true
    },
    groupVisible: {
        type: String,
        enum: Object.keys(groupVisible),
        required: false,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
});


// create group model and Export the model
export const groupModel = model<TGroup>("Group", groupSchema);