
// all the imports here
import { z } from "zod";
import { visibilityOptions } from "./post.constant";

// validation schema for create post
const createPostValidationSchema = z.object({
    body: z.object({
        postTitle: z.string({ required_error: 'Post Title is required.' }).trim(),
        postDescription: z.string({ required_error: 'Post Description is required.' }).trim(),
        user: z.string({ required_error: 'User Id is required.' }),
        isFavourite: z.boolean().default(false).optional(),
        visibility: z.string().default(visibilityOptions.public).optional(),
        isDeleted: z.boolean().default(false).optional(),
    }),
});

// validation schema for update post
const updatePostValidationSchema = z.object({
    body: z.object({
        postTitle: z.string().trim().optional(),
        postDescription: z.string().trim().optional(),
        isFavourite: z.boolean().default(false).optional(),
        visibility: z.string().default(visibilityOptions.public).optional(),
    }),
});


// all the post validaton schema
export const postValidationSchema = {
    createPostValidationSchema,
    updatePostValidationSchema,
};