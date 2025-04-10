
// all the imports here
import { z } from "zod";


// create userinfo validation schema
const createUserInfoValidationSchema = z.object({
    body: z.object({
        user: z.string({ required_error: 'User Id Field must be a string.' }).min(1).nonempty({ message: 'User Id can not be empty.' }),
        userBio: z.string({ required_error: 'User bio is a string.' }).optional(),
        userNickName: z.string({ required_error: 'User Nick name is a string.' }).optional(),
        aboutUser: z.string({ required_error: 'About User is must be string.' }).optional(),
        maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed"]).optional(),
        birthDate: z.string().optional(),
        profileImage: z.string().url().optional(),
        coverImage: z.string().url().optional(),
    }),
});


// update userinfo validation schema
const updateUserInfoValidationSchema = z.object({
    body: z.object({
        user: z.string({ required_error: 'User Id Field must be a string.' }).min(1).nonempty({ message: 'User Id can not be empty.' }),
        userBio: z.string({ required_error: 'User bio is a string.' }).optional(),
        userNickName: z.string({ required_error: 'User Nick name is a string.' }).optional(),
        aboutUser: z.string({ required_error: 'About User is must be string.' }).optional(),
        maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed"]).optional(),
        birthDate: z.string().optional(),
        profileImage: z.string().url().optional(),
        coverImage: z.string().url().optional(),
    }),
});


// all the userInfo validation schema
export const userInfoValidationSchema = {
    createUserInfoValidationSchema,
    updateUserInfoValidationSchema,
};