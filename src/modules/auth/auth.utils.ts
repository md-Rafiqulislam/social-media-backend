
// all the imports here
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendError } from '../../errors/appError';
import { TJwtPayload } from './auth.type';

// token creation function
export const createToken = (
    jwtPayload: TJwtPayload,
    secret: string,
    expiresIn: number,
) => {
    try {
        return jwt.sign(jwtPayload, secret, {
            expiresIn,
          });
    } catch (error) {
        sendError(400, "Token generation failed");
    }
};



// verify token
export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload
}