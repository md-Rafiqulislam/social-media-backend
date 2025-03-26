
// all the imports here
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/zodValidation";
import { createRotuer } from "../../utils/createRouter";
import { userRole } from "../user/user.constant";
import { postControllers } from "./post.controller";
import { postValidationSchema } from "./post.validation";

// create a router
const router = createRotuer();

// create post
router.post(
    '/create-post',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    validateRequest(postValidationSchema.createPostValidationSchema),
    postControllers.createPost
);

// update post
router.post(
    '/update-post/:postId',
    validateRequest(postValidationSchema.updatePostValidationSchema),
    postControllers.updatePost
);

// delete post
router.delete(
    '/delete-post/:postId',
    postControllers.deletePost,
);

// export post routes
export const postRoutes = router;