import {convexAuthNextjsMiddleware, createRouteMatcher, nextjsMiddlewareRedirect} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth"])

export default convexAuthNextjsMiddleware(async (request, {convexAuth}) => {
    // 用户未在登录页且未登录
    if (!isPublicPage(request) && !(await convexAuth.isAuthenticated())) {
        return nextjsMiddlewareRedirect(request, "/auth");
    }

    //TODO: 用户登录后重定向至 /auth
});

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};