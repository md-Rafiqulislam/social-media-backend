
// all the imports here
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/zodValidation";
import { createRotuer } from "../../utils/createRouter";
import { userRole } from "../user/user.constant";
import { commentControllers } from "./comment.controller";
import { commentValidationSchema } from "./comment.validation";


// create a router
const router = createRotuer();


// create comment
router.post(
    '/create-comment/',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    validateRequest(commentValidationSchema.createCommentValidationSchema),
    commentControllers.createComment,
);


// get all comments by post
router.get(
    '/get-comments/:postId',
    commentControllers.getComments,
);


// delete comment by user
router.delete(
    '/delete-comment/:commentId/',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    commentControllers.deleteCommentByUser,
);


// delete comment by post user
router.delete(
    '/delete-comment/:postId/:commentId',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    validateRequest(commentValidationSchema.deleteCommentByPostUserValidationSchema),
    commentControllers.deleteCommentByPostUser,
);


// export comment routes
export const commentRoutes = router;