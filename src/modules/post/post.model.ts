
// all the imports here
import { model, Schema } from "mongoose";
import { TPost } from "./post.type";
import { visibilityOptions } from "./post.constant";

// post schema
const postSchema = new Schema<TPost>({
    postTitle: {
        type: String,
        required: [true, 'post title is required.'],
        trim: true,
    },
    postDescription: {
        type: String,
        required: [true, 'post description is required.'],
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'UserId is required.'],
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    visibility: {
        type: String,
        default: visibilityOptions.public,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});


// create post model and export
export const postModel = model('Post', postSchema);