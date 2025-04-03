
// all the imports here
import { z } from "zod";


// validation schema for create reaction on post
const createReactionOnPostValidationSchema = z.object({
    body: z.object({
        reactionName: z.string({ required_error: 'Reaction name is required.' }).trim(),
        user: z.string({ required_error: 'User Id is required.' }).trim(),
        post: z.string({ required_error: 'Post Id is required.' }).trim(),
        isDone: z.boolean().default(true).optional(),
    }),
});


// validation schema to update reaction for post
const updateReactionOnPostValidationSchema = z.object({
    body: z.object({

    }),
});


// all the reaction validaton schema
export const reactionValidationSchema = {
    createReactionOnPostValidationSchema,
    updateReactionOnPostValidationSchema,
};