
// all the imports here
import { Types } from "mongoose"
import { albumVisibility } from "./album.constant";


// album visibility type
export type TAlbumVisibility = keyof typeof albumVisibility;


// album type
export type TAlbum = {
    user: Types.ObjectId;
    albumName: string;
    albumDescription?: string;
    pictures?: Types.ObjectId[];
    albumVisibility?: TAlbumVisibility;
    isFavourite?: boolean;
    isDeleted?: boolean;
};


// album data type
export type TAlbumData = {
    albumName: string;
    pictures: number;
}