import { validateRequest } from "../../middlewares/zodValidation";
import { createRotuer } from "../../utils/createRouter";
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
router.get('/get-me', userControllers.getUser);

// update user
router.patch('/update-user', userControllers.updateUser);

// delete user
router.delete('/delete-user', userControllers.deleteUser);

// create admin
router.post(
    '/create-admin',
    validateRequest(userValidationSchema.createUserValidationSchema),
    userControllers.createAdmin
);

// update admin
router.patch('/update-admin', userControllers.updateAdmin);

// delete admin
router.delete('/delete-admin', userControllers.deleteAdmin);

// export user routes
export const userRoutes = router;