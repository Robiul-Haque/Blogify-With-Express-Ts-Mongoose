import { Router } from "express";
import { userRoutes } from "../modules/admin/user/user.route";
import { authRoutes } from "../modules/admin/auth/auth.route";
import { blogRoutes } from "../modules/admin/blog/blog.route";
import { commentRoutes } from "../modules/admin/comment/comment.route";
import { likeRoutes } from "../modules/admin/like/like.route";

const router = Router();

const moduleRoutes = [
    {
        path: 'admin/auth',
        route: authRoutes,
    },
    {
        path: 'admin/user',
        route: userRoutes,
    },
    {
        path: 'admin/blog',
        route: blogRoutes,
    },
    {
        path: 'admin/like',
        route: likeRoutes,
    },
    {
        path: 'admin/comment',
        route: commentRoutes,
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;