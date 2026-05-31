import StudentForm from "@/components/onboarding/student-form";

export default function StudentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">
          Student Profile Setup
        </h1>

        <p className="text-zinc-400 mb-8">
          Complete your profile to continue.
        </p>

        <StudentForm />
      </div>
    </div>
  );
}