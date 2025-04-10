
// all the imports here
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/zodValidation";
import { createRotuer } from "../../utils/createRouter";
import { userRole } from "../user/user.constant";
import { authControllers } from "./auth.controller";
import { authValidationSchema } from "./auth.validation";


// create router
const router = createRotuer();


// log in user
router.post(
    '/login-user',
    validateRequest(authValidationSchema.loginValidationSchema),
    authControllers.loginUser
);


// get access token
router.post(
    '/get-access-token',
    validateRequest(authValidationSchema.refreshTokenValidationSchema),
    authControllers.getAccessToken
);


// change the old password
router.post(
    '/change-password',
    auth(
        userRole.user,
        userRole.admin,
        userRole.superAdmin,
    ),
    validateRequest(authValidationSchema.changeOldPasswordValidationSchema),
);


// export all the auth routes
export const authRoutes = router;