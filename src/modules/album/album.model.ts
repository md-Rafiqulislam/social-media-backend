
// all the imports here
import { model, Schema } from "mongoose";
import { TAlbum } from "./album.type";
import { albumVisibility } from "./album.constant";


// album schema
const albumSchema = new Schema<TAlbum>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User Id is required for creating pictures album.'],
    },
    albumName: {
        type: String,
        required: [true, 'Album name is required.'],
        trim: true,
    },
    albumDescription: {
        type: String,
        trim: true,
        required: false,
    },
    pictures: {
        type: [Schema.Types.ObjectId],
        ref: 'Picture',
        required: false,
    },
    albumVisibility: {
        type: String,
        enum: Object.values(albumVisibility),
        default: albumVisibility.public,
        required: false,
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
}, {
    timestamps: true,
});


// create album model and export it
export const albumModel = model<TAlbum>('Album', albumSchema);