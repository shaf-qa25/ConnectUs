import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getDashboardRoute } from "@/lib/redirect-user";

export async function checkStudentOnboarding(
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

  // Role selected nahi hai
  if (!user.roleSelected) {
    redirect("/onboarding");
  }

  // Student nahi hai
  if (user.roleSelected !== "STUDENT") {
    redirect(
      getDashboardRoute(user.roleSelected)
    );
  }

  // Already complete
  if (user.onboardingCompleted) {
    redirect("/student/dashboard");
  }

  return user;
}