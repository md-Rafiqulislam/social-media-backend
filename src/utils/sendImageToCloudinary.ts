
// all the import here
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import { envFile } from '../envConfig';


// config the cloudinary
cloudinary.config({
    cloud_name: envFile.cloudinaryCloudName,
    api_key: envFile.cloudinaryApiKey,
    api_secret: envFile.cloudinaryApiSecret,
});


// send image to cloudinary
export const sendImageToCloudinary = (imageName: string, path: string): Promise<Record<string, unknown>> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(path, { public_id: imageName.trim() }, function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result as UploadApiResponse);
            fs.unlink(path, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('file is deleted.');
                }
            });
        });
    });
};


// storage before file upload
const storage = multer.diskStorage({
    destination: function (req, file, cbfn) {
        cbfn(null, process.cwd() + '/upload');
    },
    filename: function (req, file, cbfn) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cbfn(null, file.fieldname + '-' + uniqueSuffix);
    },
});


export const upload = multer({ storage: storage });