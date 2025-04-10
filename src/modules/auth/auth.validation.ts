
// all the imports here
import { z } from "zod";


// login validation schema
const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'email is required.' }).email('enter a valid email address.').trim(),
        password: z.string({ required_error: 'password is required.' }),
    }),
});


// access token validation schema by refresh token
const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({ required_error: 'Refresh Token is required.' }),
    }),
});


// change old password validation schema
const changeOldPasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string({required_error: 'Old password is required.'}),
        newPassword: z.string({required_error: 'New Password is required.'}),
    }),
})


// all the auth validation schema
export const authValidationSchema = {
    loginValidationSchema,
    refreshTokenValidationSchema,
    changeOldPasswordValidationSchema,
};