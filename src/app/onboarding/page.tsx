import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import RoleSelection from "@/component/onboarding/role-selection";
import { checkOnboardingAccess } from "@/lib/onboarding-guard";

export default async function OnboardingPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await checkOnboardingAccess(userId);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-xl w-full">
        <h1 className="text-4xl font-bold text-center mb-4">
          Welcome to ConnectUs
        </h1>

        <p className="text-zinc-400 text-center">
          Choose your role to continue
        </p>

        <RoleSelection />
      </div>
    </div>
  );
}