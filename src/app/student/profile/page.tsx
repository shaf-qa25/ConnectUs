import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// import { prisma } from "@/lib/prisma";
import { getStudentProfile } from "@/services/student.service";
import { requireRole } from "@/lib/role-gaurd";
import Link from "next/link";
export default async function StudentProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await requireRole(userId, "STUDENT");

  // const user = await prisma.user.findUnique({
  //   where: {
  //     clerkId: userId,
  //   },
  //   include: {
  //     studentProfile: true,
  //   },
  // });

  const user= await getStudentProfile(userId);

  if (!user || !user.studentProfile) {
    redirect("/onboarding/student");
  }

  const profile = user.studentProfile;

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Student Profile
        </h1>

        <div className="space-y-4 border border-zinc-800 rounded-lg p-6">

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
            <strong>Graduation Year:</strong>{" "}
            {profile.graduationYear}
          </p>

          <p>
            <strong>Bio:</strong>{" "}
            {profile.bio}
          </p>

          <p>
            <strong>LinkedIn:</strong>{" "}
            {profile.linkedinUrl}
          </p>

          <p>
            <strong>Github:</strong>{" "}
            {profile.githubUrl}
          </p>

          <div>
            <strong>Skills:</strong>

            <div className="flex flex-wrap gap-2 mt-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded bg-zinc-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      <div>
        <Link href="student/profile/edit"
        className="inline-block mt-6 px-5 py-2 rounded bg-blue-600">
          Edit profile 
        </Link>
      </div>
    </div>
  );
}