
// all the imports here
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/zodValidation";
import { createRotuer } from "../../utils/createRouter";
import { userRole } from "../user/user.constant";
import { reactionControllers } from "./reaction.controller";
import { reactionValidationSchema } from "./reaction.validation";


// create a router
const router = createRotuer();


// create reeaction for post
router.post(
    'add-reaction/:postId',
    auth(
        userRole.user,
        userRole.admin,
        userRole.superAdmin
    ),
    validateRequest(
        reactionValidationSchema.createReactionOnPostValidationSchema
    ),
    reactionControllers.createReactionForPost,
);


// export react routes
export const reactionRoutes = router;