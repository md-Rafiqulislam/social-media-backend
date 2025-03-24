
// all the imports here
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendError } from '../../errors/appError';
import { TJwtPayload } from './auth.type';

// token creation function
export const createToken = (
    jwtPayload: TJwtPayload,
    secret: string,
    // expiresIn: number,
    expiresIn: string,
) => {
    try {
        const token = jwt.sign(jwtPayload, secret, {
            // expiresIn: expiresIn,
            expiresIn: '1d',
            algorithm: 'HS512',
        });
        return token;
    } catch (error) {
        sendError(400, 'Token generation failed');
    }
};


// // verify token
// export const verifyToken = (token: string, secret: string) => {
//     return jwt.verify(token, secret) as JwtPayload
// }


// password matching function
export const checkedPasswordMatched = (payloadPassword: string, userPassword: string) => {
    let isMatched: boolean = false;
    if (payloadPassword === userPassword) {
        isMatched = true;
    } else {
        isMatched = false;
    }

    return isMatched;
};