import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
// import { redirect } from "next/navigation";
// import { prisma } from "@/lib/prisma";

import { UserRole } from "@prisma/client";

export async function requireRole(
  clerkId: string,
  allowedRole: UserRole
) {
  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });

  if (!user) {
    redirect("/sign-in");
  }

  if (!user.roleSelected) {
    redirect("/onboarding");
  }

  if (user.roleSelected !== allowedRole) {
    redirect("/dashboard");
  }

  return user;
}