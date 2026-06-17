import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getDashboardRoute } from "@/lib/redirect-user";

import { UserRole } from "@prisma/client";

export async function requireRole(
  clerkId: string,
  allowedRole: UserRole
) {
  console.log("========== ROLE GUARD ==========");

  console.log("Checking role access...");
  console.log("Clerk ID:", clerkId);
  console.log("Required Role:", allowedRole);

  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });

  if (!user) {
    console.log("User not found");

    redirect("/sign-in");
  }

  if (!user.roleSelected) {
    console.log("Role not selected");

    redirect("/onboarding");
  }

  if (user.roleSelected !== allowedRole) {
    console.log("Unauthorized role access");

    redirect(
      getDashboardRoute(
        user.roleSelected
      )
    );
  }

  console.log("Role access granted");

  return user;
}