import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getDashboardRoute } from "@/lib/redirect-user";

export async function checkOnboardingAccess(
  clerkId: string
) {
  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });

  if (!user) {
    redirect("/sign-in");
  }

  if (
    user.roleSelected &&
    user.onboardingCompleted
  ) {
    redirect(
      getDashboardRoute(user.roleSelected)
    );
  }

  return user;
}