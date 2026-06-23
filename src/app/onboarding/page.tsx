import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import RoleSelection from "@/component/onboarding/role-selection";
import { checkOnboardingAccess } from "@/lib/onboarding-guard";
import SoftAurora from "@/components/SoftAurora"

export default async function OnboardingPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await checkOnboardingAccess(userId);

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-zinc-950">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1}
          color1="#f7f7f7"
          color2="#e100ff"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction
          mouseInfluence={0.25}
        />
      </div>
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-zinc-950/40 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
              Welcome to ConnectUs
            </h1>
            <p className="text-zinc-400 text-sm">
              Choose your role to continue
            </p>
          </div>

          <RoleSelection />
        </div>
      </div >
    </>
  );
}