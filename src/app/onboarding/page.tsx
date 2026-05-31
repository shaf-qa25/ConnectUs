import RoleSelection from "@/component/onboarding/role-selection";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-xl w-full">
        <h1 className="text-4xl font-bold text-center mb-4">
          Welcome to ConnectUs
        </h1>

        <p className="text-zinc-400 text-center">
          Choose your role to continue
        </p>

        <RoleSelection/>
      </div>
    </div>
  );
}