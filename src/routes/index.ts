
// all the imports here
import { authRoutes } from "../modules/auth/auth.route";
import { postRoutes } from "../modules/post/post.route";
import { userRoutes } from "../modules/user/user.route";
import { createRotuer } from "../utils/createRouter";
import { TRoute } from "./route.type";

// create a router
const router = createRotuer();

// all modules route
const modulesRoute: TRoute[] = [
    {
        path: '/user',
        route: userRoutes,
    },
    {
        path: '/post',
        route: postRoutes,
    },
    {
        path: '/auth',
        route: authRoutes,
    }
];

// go through all the routes
modulesRoute.forEach((singleRoute: TRoute) => {
    router.use(singleRoute.path, singleRoute.route);
});

// export app routes
export const applicationRouetes = router;