
// all the imports here
import { z } from "zod";

// login validation schema
const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'email is required.' }).email('enter a valid email address.').trim(),
        password: z.string({ required_error: 'password is required.' }),
    }),
});


// all the auth validation schema
export const authValidationSchema = {
    loginValidationSchema,
};