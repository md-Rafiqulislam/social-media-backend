
// all the imports here
import { model, Schema } from "mongoose";
import { TComment } from "./comment.type";

// comment schema
const commentSchema = new Schema<TComment>({
    content: {
        type: String,
        required: [true, 'Comment content is required.'],
        trim: true,
        min: [1, 'Comment content can not be empty'],
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User Id is required.'],
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Post Id is required.'],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});


// create comment model and export
export const commentModel = model('Comment', commentSchema);