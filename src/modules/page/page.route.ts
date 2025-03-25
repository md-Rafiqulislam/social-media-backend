
// all the imports here
import { validateRequest } from "../../middlewares/zodValidation";
import { createRotuer } from "../../utils/createRouter";

// create router
const router = createRotuer();


// export all the page routes
export const pageRoutes = router;