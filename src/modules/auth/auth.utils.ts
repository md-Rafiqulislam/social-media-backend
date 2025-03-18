
// all the imports here
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendError } from '../../errors/appError';

// token creation function
export const createToken = (
    jwtPayload: { userId: string; userRole: string },
    secret: string,
    expiresIn: string
) => {
    try {
        return jwt.sign(jwtPayload, secret, { expiresIn });
    } catch (error) {
        sendError(400, "Token generation failed");
    }
};



// verify token
export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload
}