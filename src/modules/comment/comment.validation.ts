
// all the imports here
import { z } from "zod";


// validation schema for create post
const createCommentValidationSchema = z.object({
    body: z.object({
        content: z.string({ required_error: 'Comment content is required.' })
            .trim()
            .min(1, { message: "Comment content cannot be empty." })
            .nonempty({ message: "Comment content is required." }),
        userId: z.string({ required_error: 'User Id is required.' })
            .nonempty({ message: 'User id can not be empty.' }),
        postId: z.string({ required_error: 'Post Id is required.' })
            .nonempty({ message: 'Post Id can not be empty.' }),
        isDeleted: z.boolean().default(false).optional(),
    }),
});


// all the comment validaton schema
export const commentValidationSchema = {
    createCommentValidationSchema,
};