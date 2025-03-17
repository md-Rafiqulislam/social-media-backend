
// all the imports here
import { model, Schema } from "mongoose";
import { TPost } from "./post.type";

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
    isDeleted: {
        type: String,
        default: false,
    }
}, {
    timestamps: true,
});


// create post model and export
export const postModel = model('Post', postSchema);