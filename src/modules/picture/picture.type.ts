
// all the imports here
import { Types } from "mongoose";
import { pictureUploadType } from "./picture.constant";


// picture upload type
export type TPictureUploadType = keyof typeof pictureUploadType;


// picture type
export type TPicture = {
    imageTitle?: string;
    imageDescription?: string;
    pictureUploadType?: TPictureUploadType;
    image: string;
    user: Types.ObjectId;
    isActive?: boolean;
    isDeleted?: boolean;
    isFavourite?: boolean;
};