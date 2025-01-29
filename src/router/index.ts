import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { adminRoutes } from "../modules/admin/admin.route";
import { blogRoutes } from "../modules/blog/blog.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/user',
        route: userRoutes,
    },
    {
        path: '/admin',
        route: adminRoutes,
    },
    {
        path: '/blog',
        route: blogRoutes,
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;