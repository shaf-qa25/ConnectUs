import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { checkRoleAccess } from "@/lib/role-guard";

export default async function StudentDashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await checkRoleAccess(
    userId,
    "STUDENT"
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">
        Student Dashboard
      </h1>
    </div>
  );
}