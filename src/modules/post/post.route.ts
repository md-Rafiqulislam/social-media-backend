
// all the imports here
import { validateRequest } from "../../middlewares/zodValidation";
import { createRotuer } from "../../utils/createRouter";
import { postControllers } from "./post.controller";
import { postValidationSchema } from "./post.validation";

// create a router
const router = createRotuer();

// create post
router.post(
    '/create-post',
    validateRequest(postValidationSchema.createPostValidationSchema),
    postControllers.createPost
);

// update post
router.post('/update-post/:postId', postControllers.updatePost);

// delete post
router.delete(
    '/delete-post/:postId',
    postControllers.deletePost,
);

// export post routes
export const postRoutes = router;