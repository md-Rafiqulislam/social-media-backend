
// all the imports here
import { z } from "zod";
import { userGender, userRole, userStatus } from "./user.constant";


// create user validation schema
const createUserValidationSchema = z.object({
    body: z.object({
        firstName: z.string()
            .trim()
            .min(2, { message: 'Name must be at least 2 characters long.' })
            .max(50, { message: 'Name cannot exceed 50 characters.' }),
        lastName: z.string()
            .trim()
            .min(2, { message: 'Name must be at least 2 characters long.' })
            .max(50, { message: 'Name cannot exceed 50 characters.' })
            .optional(),
        email: z.string()
            .trim()
            .email({ message: 'Please use a valid email address.' }),
        password: z.string()
            .trim()
            .regex(
                /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/g,
                'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.'
            ),
        gender: z.enum(Object.values(userGender) as [userGender, ...userGender[]]),
        userRole: z.enum(Object.values(userRole) as [userRole, ...userRole[]]).default(userRole.user).optional(),
        userStatus: z.enum(Object.values(userStatus) as [userStatus, ...userStatus[]]).default(userStatus.active).optional(),
        isDeleted: z.boolean().default(false).optional(),
    }),
});


// update user validation schema
const updateUserValidationSchema = z.object({
    body: z.object({
        firstName: z.string()
            .trim()
            .min(2, { message: 'Name must be at least 2 characters long.' })
            .max(50, { message: 'Name cannot exceed 50 characters.' }).optional(),
        lastName: z.string()
            .trim()
            .min(2, { message: 'Name must be at least 2 characters long.' })
            .max(50, { message: 'Name cannot exceed 50 characters.' })
            .optional(),
        email: z.string()
            .trim()
            .email({ message: 'Please use a valid email address.' }).optional(),
        userRole: z.enum(Object.values(userRole) as [userRole, ...userRole[]]).default(userRole.user).optional(),
        userStatus: z.enum(Object.values(userStatus) as [userStatus, ...userStatus[]]).default(userStatus.active).optional(),
        isDeleted: z.boolean().default(false).optional(),
    }),
});


// block user validation schema
const blockUserValidationSchema = z.object({
    body: z.object({
        userId: z.string({ required_error: 'user Id is required.' }).nonempty('This field can not be empty.'),
    }),
});


// block user validation schema
const deleteUserValidationSchema = z.object({
    body: z.object({
        userId: z.string({ required_error: 'user Id is required.' }).nonempty('This field can not be empty.'),
    }),
});


// block user validation schema
const convertUserToAdminValidationSchema = z.object({
    body: z.object({
        userId: z.string({ required_error: 'User Id is required.' }).nonempty('This field can not be empty.'),
    }),
});



// export all the user validation schema
export const userValidationSchema = {
    createUserValidationSchema,
    updateUserValidationSchema,
    blockUserValidationSchema,
    deleteUserValidationSchema,
    convertUserToAdminValidationSchema,
};