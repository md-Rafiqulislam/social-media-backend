
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


// get all posts
router.get(
    '/all-post',
    postControllers.getAllPost,
);


// get post by user from db
router.get(
    '/all-post/:userId',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    postControllers.getAllPostByUser,
);


// update post
router.patch(
    '/update-post/:postId',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    validateRequest(postValidationSchema.updatePostValidationSchema),
    postControllers.updatePost
);

// delete post
router.delete(
    '/delete-post/:postId',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    postControllers.deletePostByUser,
);

// export post routes
export const postRoutes = router;