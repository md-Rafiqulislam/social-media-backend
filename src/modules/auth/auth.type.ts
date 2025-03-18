
// login type
export type TLogin = {
    email: string;
    password: string;
};


// jwt payload type
export type TJwtPayload = {
    userId: string;
    userRole: string;
};