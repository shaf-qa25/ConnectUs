// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

// import { checkRoleAccess } from "@/lib/role-guard";

// export default async function StudentDashboard() {
//   const { userId } = await auth();

//   if (!userId) {
//     redirect("/sign-in");
//   }

//   await checkRoleAccess(
//     userId,
//     "STUDENT"
//   );

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <h1 className="text-4xl font-bold">
//         Student Dashboard
//       </h1>
//     </div>
//   );
// }


// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import Link from "next/link";

// import { requireRole } from "@/lib/role-gaurd";
// import { getStudentProfile } from "@/services/student.service";

// export default async function StudentDashboardPage() {
//   console.log(
//     "========== STUDENT DASHBOARD =========="
//   );

//   const { userId } = await auth();

//   console.log("Clerk User ID:", userId);

//   if (!userId) {
//     console.log(
//       "No user found -> redirecting to sign-in"
//     );

//     redirect("/sign-in");
//   }

//   await requireRole(userId, "STUDENT");

//   const user = await getStudentProfile(
//     userId
//   );

//   if (!user || !user.studentProfile) {
//     console.log(
//       "Student profile missing -> onboarding"
//     );

//     redirect("/onboarding/student");
//   }

//   const profile = user.studentProfile;

//   console.log(
//     "Dashboard Loaded Successfully"
//   );

//   return (
//     <div className="min-h-screen bg-black text-white p-10">
//       <div className="max-w-4xl mx-auto">

//         <h1 className="text-4xl font-bold mb-8">
//           Student Dashboard
//         </h1>

//         <div className="border border-zinc-800 rounded-lg p-6 space-y-4">

//           <p>
//             <strong>Name:</strong>{" "}
//             {user.username || "Student"}
//           </p>

//           <p>
//             <strong>Email:</strong>{" "}
//             {user.email}
//           </p>

//           <p>
//             <strong>Student ID:</strong>{" "}
//             {profile.studentId}
//           </p>

//           <p>
//             <strong>Course:</strong>{" "}
//             {profile.course}
//           </p>

//           <p>
//             <strong>Branch:</strong>{" "}
//             {profile.branch}
//           </p>

//           <p>
//             <strong>Graduation Year:</strong>{" "}
//             {profile.graduationYear}
//           </p>

//           <div>
//             <strong>Skills:</strong>

//             <div className="flex flex-wrap gap-2 mt-2">
//               {profile.skills.map((skill) => (
//                 <span
//                   key={skill}
//                   className="px-3 py-1 rounded bg-zinc-800"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="flex gap-4 mt-8">

//           <Link
//             href="/student/profile"
//             className="px-5 py-2 rounded bg-blue-600"
//           >
//             View Profile
//           </Link>

//           <Link
//             href="/student/profile/edit"
//             className="px-5 py-2 rounded bg-green-600"
//           >
//             Edit Profile
//           </Link>

//         </div>
//       </div>
//     </div>
//   );
// }


import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

import { requireRole } from "@/lib/role-guard";

import { getStudentProfile }
from "@/services/student.service";

export default async function StudentDashboardPage() {
  console.log(
    "========== STUDENT DASHBOARD =========="
  );

  const { userId } = await auth();

  console.log("User ID:", userId);

  if (!userId) {
    console.log(
      "No authenticated user"
    );

    redirect("/sign-in");
  }

  await requireRole(
    userId,
    "STUDENT"
  );

  const user =
    await getStudentProfile(
      userId
    );

  if (
    !user ||
    !user.studentProfile
  ) {
    console.log(
      "Student profile missing"
    );

    redirect(
      "/onboarding/student"
    );
  }

  const profile =
    user.studentProfile;

  console.log(
    "Dashboard loaded successfully"
  );

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Student Dashboard
        </h1>

        <div className="grid gap-6">

          <div className="border border-zinc-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Basic Information
            </h2>

            <div className="space-y-3">

              <p>
                <strong>Email:</strong>{" "}
                {user.email}
              </p>

              <p>
                <strong>Student ID:</strong>{" "}
                {profile.studentId}
              </p>

              <p>
                <strong>Course:</strong>{" "}
                {profile.course}
              </p>

              <p>
                <strong>Branch:</strong>{" "}
                {profile.branch}
              </p>

              <p>
                <strong>
                  Graduation Year:
                </strong>{" "}
                {profile.graduationYear}
              </p>

            </div>
          </div>

          <div className="border border-zinc-800 rounded-lg p-6">

            <h2 className="text-2xl font-semibold mb-4">
              Bio
            </h2>

            <p>
              {profile.bio ||
                "No bio added"}
            </p>

          </div>

          <div className="border border-zinc-800 rounded-lg p-6">

            <h2 className="text-2xl font-semibold mb-4">
              Skills
            </h2>

            <div className="flex flex-wrap gap-2">

              {profile.skills.map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded bg-zinc-800"
                  >
                    {skill}
                  </span>
                )
              )}

            </div>

          </div>

          <div className="flex gap-4">

            <Link
              href="/student/profile"
              className="px-5 py-2 rounded bg-blue-600"
            >
              View Profile
            </Link>

            <Link
              href="/student/profile/edit"
              className="px-5 py-2 rounded bg-green-600"
            >
              Edit Profile
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}