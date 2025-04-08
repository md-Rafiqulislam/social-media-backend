
// all the imports here
import { model, Schema } from "mongoose";
import { TPicture } from "./picture.type";
import { pictureUploadType } from "./picture.constant";


// picture schema
const pictureSchema = new Schema<TPicture>({
    imageTitle: {
        type: String,
        required: false,
    },
    imageDescription: {
        type: String,
        required: false,
    },
    pictureUploadType: {
        type: String,
        enum: Object.values(pictureUploadType),
        default: pictureUploadType.unspecified,
        required: false,
    },
    image: {
        type: String,
        required: [true, 'Image is required.'],
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User Id is required.'],
        ref: 'User',
    },
    isFavourite: {
        type: Boolean,
        default: false,
        required: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: false,
    }
});


// create and upload picture model
export const pictureModel = model<TPicture>('Picture', pictureSchema);