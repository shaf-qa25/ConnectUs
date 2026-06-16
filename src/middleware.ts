import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(
  async (auth, req) => {
    console.log(
      "========== MIDDLEWARE =========="
    );

    console.log(
      "Path:",
      req.nextUrl.pathname
    );

    if (!isPublicRoute(req)) {
      await auth.protect();

      const { userId } = await auth();

      console.log(
        "Authenticated User:",
        userId
      );
    }
  }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.[^?]*$).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};