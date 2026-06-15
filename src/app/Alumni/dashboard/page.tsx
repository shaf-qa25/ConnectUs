import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { requireRole } from "@/lib/role-guard";

export default async function AlumniDashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await requireRole(
    userId,
    "ALUMNI"
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">
        Alumni Dashboard
      </h1>
    </div>
  );
}