
// all the imports here
import { model, Schema } from "mongoose";
import { TPage } from "./page.type";
import { visibility } from "./page.constant";

// page shcema
const pageSchema = new Schema<TPage>({
    title: {
        type: String,
        required: [true, 'Page Title is required.'],
    }, description: {
        type: String,
        required: [true, 'Page Description is required.'],
    },
    pageType: {
        type: String,
        required: [true, 'Page Type is required.'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User Id is required.'],
    },
    visibility: {
        type: String,
        enum: Object.values(visibility),
        default: visibility.public,
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});


// create page model and export
export const pageModel = model('Page', pageSchema);