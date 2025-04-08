
// all the imports here
import { model, Schema } from "mongoose";
import { TPicture } from "./picture.type";
import { pictureUploadType } from "./picture.constant";


// picture schema
const pictureSchema = new Schema<TPicture>({
    imageTitle: {
        type: String,
        required: false,
        trim: true,
    },
    imageDescription: {
        type: String,
        required: false,
        trim: true,
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
    isActive: {
        type: Boolean,
        default: true,
        required: true,
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
},{
    timestamps: true,
});


// create and upload picture model
export const pictureModel = model<TPicture>('Picture', pictureSchema);