import { createRotuer } from "../../utils/createRouter";
import { userControllers } from "./user.controller";

// create a router
const router = createRotuer();

// create user
router.post('/create-user', userControllers.createUser);

// get me route for get the user
router.get('/get-me', userControllers.getUser);

// update user
router.patch('/update-user', userControllers.updateUser);

// delete user
router.delete('/delete-user', userControllers.deleteUser);

// create admin
router.post('/create-admin', userControllers.createAdmin);

// update admin
router.patch('/update-admin', userControllers.updateAdmin);

// delete admin
router.delete('/delete-admin', userControllers.deleteAdmin);

// export user routes
export const userRoutes = router;