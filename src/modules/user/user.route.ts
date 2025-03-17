import { createRotuer } from "../../utils/createRouter";
import { userControllers } from "./user.controller";

// create a router
const router = createRotuer();

// create user
router.post('/create-user', userControllers.createUser);

// update user
router.patch('/update-user', userControllers.updateUser);

// delete user
router.delete('/delete-user', userControllers.updateUser);

// create admin
router.post('/create-admin', userControllers.createAdmin);

// update admin
router.patch('/update-admin', userControllers.updateAdmin);

// export user routes
export const userRoutes = router;