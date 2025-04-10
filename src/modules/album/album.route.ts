
// all the imports here
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/zodValidation";
import { createRotuer } from "../../utils/createRouter";
import { userRole } from "../user/user.constant";
import { albumControllers } from "./album.controller";


// create a router
const router = createRotuer();


// create album
router.post(
    '/create-album',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    albumControllers.createAlbum,
);


// get all the album by user
router.get(
    '/get-all-album/mine',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    albumControllers.getAlbumByUser,
);


// get the single album
router.get(
    '/get-album/:albumId',
    auth(userRole.user, userRole.admin, userRole.superAdmin),
    albumControllers.getSingleAlbumByUser,
);


// export album routes
export const albumRoutes = router;