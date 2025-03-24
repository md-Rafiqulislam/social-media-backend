
// all the imports here
import { JwtPayload } from "jsonwebtoken";

// extend express Request by globally
declare global {
    namespace Express {
        interface Request {
            user: JwtPayload;
        }
    }
}