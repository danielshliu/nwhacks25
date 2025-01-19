import { convexAuthNextjsMiddleware } from "@convex-dev/auth/nextjs/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  // Skip Next.js internals and all static files, unless found in search params
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
  // Always run for API routes
  // '/(api|trpc)(.*)',
};
