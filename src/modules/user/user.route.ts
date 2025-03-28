
// all the imports here
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/zodValidation";
import { createRotuer } from "../../utils/createRouter";
import { userRole } from "./user.constant";
import { userControllers } from "./user.controller";
import { userValidationSchema } from "./user.validation";

// create a router
const router = createRotuer();

// create user
router.post(
    '/create-user',
    validateRequest(userValidationSchema.createUserValidationSchema),
    userControllers.createUser
);


// get me route for get the user
router.get(
    '/get-me',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    userControllers.getUser,
);


// update user
router.patch(
    '/update-user',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    validateRequest(userValidationSchema.updateUserValidationSchema),
    userControllers.updateUser
);


// delete user
router.delete(
    '/delete-user',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    userControllers.deleteUser
);


// create admin
router.post(
    '/create-admin',
    auth(userRole.superAdmin),
    validateRequest(userValidationSchema.createUserValidationSchema),
    userControllers.createAdmin
);


// block user status by admin and super admin
router.patch(
    '/bocked-user/:userId',
    auth(userRole.admin, userRole.superAdmin),
    userControllers.blockUser,
);

// export user routes
export const userRoutes = router;