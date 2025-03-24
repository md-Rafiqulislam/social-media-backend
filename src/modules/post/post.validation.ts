
// all the imports here
import { z } from "zod";
import { visibilityOptions } from "./post.constant";

// validation schema for create post
const createPostValidationSchema = z.object({
    body: z.object({
        postTitle: z.string({ required_error: 'Post Title is required.' }),
        postDescription: z.string({ required_error: 'Post Description is required.' }),
        userId: z.string({ required_error: 'User Id is required.' }),
        isFavourite: z.boolean().default(false).optional(),
        visibility: z.string().default(visibilityOptions.public).optional(),
        isDeleted: z.boolean().default(false).optional(),
    }),
});


// all the post validaton schema
export const postValidationSchema = {
    createPostValidationSchema,
};