
// all the imports here
import { auth } from "../../middlewares/auth";
import { createRotuer } from "../../utils/createRouter";
import { userRole } from "../user/user.constant";
import { groupControllers } from "./group.controller";


// create a router
const router = createRotuer();


router.post(
    '',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    groupControllers.createGroup,
);


// export all the group routes
export const groupRoutes = router;