
// all the imports here
import { validateHeaderName } from "http";
import { auth } from "../../middlewares/auth";
import { createRotuer } from "../../utils/createRouter";
import { userRole } from "../user/user.constant";
import { userInfoControllers } from "./userInfo.controller";
import { validateRequest } from "../../middlewares/zodValidation";
import { userInfoValidationSchema } from "./userInfo.validation";


// create a router
const router = createRotuer();


// create user info model
router.post(
    '/create-user-info',
    auth(
        userRole.user,
        userRole.admin,
        userRole.superAdmin
    ),
    validateRequest(
        userInfoValidationSchema.createUserInfoValidationSchema
    ),
    userInfoControllers.createUserInfo,
);


// get user info
router.get(
    '/get-user-info/me',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    userInfoControllers.getUserInfo,
);


// update user info
router.patch(
    '/update-user-info/me',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    userInfoControllers.updateUserInfo,
);


// export all the user info routes
export const userInfoRoutes = router;