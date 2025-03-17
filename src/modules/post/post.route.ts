
// all the imports here
import { createRotuer } from "../../utils/createRouter";
import { postControllers } from "./post.controller";

// create a router
const router = createRotuer();

// create post
router.post('/create-post', postControllers.createPost);

// update post
router.post('/update-post/:postId', postControllers.updatePost);

// export post routes
export const postRoutes = router;