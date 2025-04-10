
// all the imports here
import { HttpStatus } from "http-status-ts";
import { sendError } from "../../errors/appError";
import { albumModel } from "./album.model";
import { TAlbum, TAlbumData } from "./album.type";


// create album in the database
const createAlbumIntoDb = async (payload: TAlbum) => {
    const result = await albumModel.create(payload);
    return result;
};


// get all album by user from database
const getAlbumByUserFromDb = async (userId: string) => {
    // find all the album
    const albums = await albumModel.find({ user: userId, isDeleted: false }).lean();

    // check the albums
    if (!albums || albums.length === 0) {
        sendError(HttpStatus.NOT_FOUND, 'Album not found.');
    }

    const result: TAlbumData[] = albums.reduce((acc: TAlbumData[], album: TAlbum) => {
        if (album.pictures && album?.pictures?.length > 0 && !album?.isDeleted) {

            const albumData: TAlbumData = {
                albumName: album.albumName,
                pictures: album.pictures.length,
            };
            acc.push(albumData);
        }
        return acc;
    }, []);

    // send the result
    return result;
};


// export all the album services
export const albumServices = {
    createAlbumIntoDb,
    getAlbumByUserFromDb,
};