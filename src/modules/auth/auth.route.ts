
// all the imports here
import { validateRequest } from "../../middlewares/zodValidation";
import { createRotuer } from "../../utils/createRouter";
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

// export all the auth routes
export const authRoutes = router;