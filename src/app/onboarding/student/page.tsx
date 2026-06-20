import StudentForm from "@/component/onboarding/student-form";
import SoftAurora from "@/components/SoftAurora";

export default function StudentPage() {
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

      <div className="relative z-10 h-screen w-full flex items-center justify-center p-4">
        {/* Glassmorphism Card */}
        <div className="w-full max-w-xl bg-zinc-950/40 backdrop-blur-2xl border border-white/10 p-4 rounded-3xl shadow-2xl">
          <div className="text-center mb-4">
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
              Student Profile
            </h1>
            <p className="text-zinc-400 text-sm">
              Complete your profile to unlock ConnectUs
            </p>
          </div>
          <StudentForm />
        </div>
      </div>
    </>
  );
}