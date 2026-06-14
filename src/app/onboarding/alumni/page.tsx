import AlumniForm from "@/component/onboarding/alumni-form";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AlumniPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">
          Alumni Profile Setup
        </h1>

        <p className="text-zinc-400 mb-8">
          Complete your profile to continue.
        </p>

        <AlumniForm />
      </div>
    </div>
  );
}