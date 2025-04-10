
// all the imports here
import jwt from 'jsonwebtoken';
import { sendError } from '../../errors/appError';
import { TJwtPayload } from './auth.type';
import bcrypt from 'bcrypt';


// token creation function
export const createToken = (
    jwtPayload: TJwtPayload,
    secret: string,
    expiresIn: number,
) => {
    try {
        const token = jwt.sign(jwtPayload, secret, { expiresIn });
        return token;
    } catch (error) {
        sendError(400, 'Token generation failed');
    }
};


// password matching function
export const checkedPasswordMatched = async (payloadPassword: string, userPassword: string) => {
    return await bcrypt.compare(payloadPassword, userPassword);
};