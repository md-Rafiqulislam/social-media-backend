
// all the imports here
import { model, Schema } from "mongoose";
import { TReact } from "./react.type";
import { reactName } from "./react.constant";


//  react schema
const reactSchema = new Schema<TReact>({
    reactName: {
        type: String,
        enum: Object.keys(reactName),
        required: [true, "React name is required."],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required."],
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: false,
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: false,
    },
    isDone: {
        type: Boolean,
        default: false,
        required: false,
    },
}, {
    timestamps: true,
});


// Create and export the React model
export const reactModel = model("React", reactSchema);
