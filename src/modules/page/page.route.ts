
// all the imports here
import { validateRequest } from "../../middlewares/zodValidation";
import { createRotuer } from "../../utils/createRouter";
import { pageControllers } from "./page.controller";

// create router
const router = createRotuer();

// create page
router.post(
    '/create-page',
    pageControllers.createpage
);

// update page
router.patch(
    '/update-page/:pageId',
    pageControllers.updatePage,
);

// delete page
router.delete(
    '/delete-page/:pageId',
    pageControllers.deletePage,
);

// export all the page routes
export const pageRoutes = router;