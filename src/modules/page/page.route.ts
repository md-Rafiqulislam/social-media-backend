
// all the imports here
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/zodValidation";
import { createRotuer } from "../../utils/createRouter";
import { userRole } from "../user/user.constant";
import { pageControllers } from "./page.controller";

// create router
const router = createRotuer();

// create page
router.post(
    '/create-page',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    pageControllers.createpage
);


// update page
router.patch(
    '/update-page/:pageId',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    pageControllers.updatePage,
);


// delete page
router.delete(
    '/delete-page/:pageId',
    pageControllers.deletePage,
);

// export all the page routes
export const pageRoutes = router;