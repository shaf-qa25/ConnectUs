import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public (unprotected) routes. 
// Users can access the landing page and authentication screens without signing in.
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // If the route is not public, protect it with Clerk authentication
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files (images, fonts, etc.) unless found in search params
    "/((?!_next|[^?]*\\.[^?]*$).*)",
    // Always run middleware for API and tRPC routes
    "/(api|trpc)(.*)",
    // Required Clerk internal proxy route
    "/__clerk/(.*)",
  ],
};
