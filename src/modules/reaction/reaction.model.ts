
// all the imports here
import { model, Schema } from "mongoose";
import { TReaction } from "./reaction.type";
import { reactionName } from "./reaction.constant";


//  react schema
const reactionSchema = new Schema<TReaction>({
    reactionName: {
        type: String,
        enum: Object.values(reactionName),
        required: [true, "Reaction name is required."],
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
export const reactionModel = model("Reaction", reactionSchema);
