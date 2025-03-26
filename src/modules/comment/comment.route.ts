
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


// export comment routes
export const commentRoutes = router;