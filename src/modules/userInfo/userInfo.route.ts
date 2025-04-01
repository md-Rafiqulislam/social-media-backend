
// all the imports here
import { auth } from "../../middlewares/auth";
import { createRotuer } from "../../utils/createRouter";
import { userRole } from "../user/user.constant";
import { userInfoControllers } from "./userInfo.controller";


// create a router
const router = createRotuer();


// create user info model
router.post(
    '/create-user-info',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    userInfoControllers.createUserInfo,
);


// export all the user info routes
export const userInfoRoutes = router;