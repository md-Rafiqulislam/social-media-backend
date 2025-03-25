
// all the imports here
import { validateRequest } from "../../middlewares/zodValidation";
import { createRotuer } from "../../utils/createRouter";
import { commentControllers } from "./comment.controller";
import { commentValidationSchema } from "./comment.validation";


// create a router
const router = createRotuer();


// create comment
router.post(
    '/create-comment',
    validateRequest(commentValidationSchema.createCommentValidationSchema),
    commentControllers.createComment,
);


// export comment routes
export const commentRoutes = router;