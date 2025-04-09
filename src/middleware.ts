import {convexAuthNextjsMiddleware, createRouteMatcher, nextjsMiddlewareRedirect} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/login"])

export default convexAuthNextjsMiddleware(async (request, {convexAuth}) => {
    if (!isPublicPage(request) && !(await convexAuth.isAuthenticated())) {
        return nextjsMiddlewareRedirect(request, "/login");
    }

});

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};