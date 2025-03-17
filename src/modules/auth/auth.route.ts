
// all the imports here
import { createRotuer } from "../../utils/createRouter";
import { authControllers } from "./auth.controller";

// create router
const router = createRotuer();

// log in user
router.post('/login-user', authControllers.loginUser);

// export all the auth routes
export const authRoutes = router;