
// all the imports here
import path from "path";
import dotenv from 'dotenv';

// join all the env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

// export all the env file
export const envFile = {
    port: process.env.PORT,
    dbUrl: process.env.DATABASE_URL as string,
    nEnv: process.env.NODE_ENV,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
    accessTokenExpire: Number(process.env.ACCESS_TOKEN_EXPIRE_IN),
    refreshTokenExpire: Number(process.env.REFRESH_TOKEN_EXPIRE_IN),
    saltRounds: process.env.SALT_ROUNDS,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};