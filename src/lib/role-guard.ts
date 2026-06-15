import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getDashboardRoute } from "@/lib/redirect-user";

export async function checkRoleAccess(
  clerkId: string,
  requiredRole:
    | "STUDENT"
    | "ALUMNI"
    | "TEACHER"
    | "TNP"
) {
  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });

  if (!user) {
    redirect("/sign-in");
  }

  if (user.roleSelected !== requiredRole) {
    redirect(
      getDashboardRoute(
        user.roleSelected
      )
    );
  }

  return user;
}