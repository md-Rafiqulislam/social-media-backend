
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
    accessTokenExpire: process.env.ACCESS_TOKEN_EXPIRE_IN as string,
    refreshTokenExpire: process.env.REFRESH_TOKEN_EXPIRE_IN as string,
};