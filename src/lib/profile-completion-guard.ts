import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getDashboardRoute } from "@/lib/redirect-user";

export async function checkProfileCompletion(
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

  if (!user.roleSelected) {
    redirect("/onboarding");
  }

  if (!user.onboardingCompleted) {
    switch (user.roleSelected) {
      case "STUDENT":
        redirect("/onboarding/student");

      case "ALUMNI":
        redirect("/onboarding/alumni");

      case "TEACHER":
        redirect("/onboarding/teacher");

      case "TNP":
        redirect("/onboarding/tnp");
    }
  }

  return user;
}