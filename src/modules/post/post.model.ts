
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
    isFavourite: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: String,
        default: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'UserId is required.'],
    }
}, {
    timestamps: true,
});


// create post model and export
export const postModel = model('Post', postSchema);