import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { requireRole } from "@/lib/role-gaurd";

import { getStudentProfile } from "@/services/student.service";

import { updateStudentProfile } from "@/action/update-student-profile";

export default async function EditStudentProfilePage() {
const { userId } = await auth();

if (!userId) {
redirect("/sign-in");
}

await requireRole(userId, "STUDENT");

const user = await getStudentProfile(userId);

if (!user || !user.studentProfile) {
redirect("/onboarding/student");
}

const profile = user.studentProfile;

return (<>
 <div className="min-h-screen bg-black text-white p-10"> <div className="max-w-3xl mx-auto">


    <h1 className="text-4xl font-bold mb-8">
      Edit Profile
    </h1>

    <form
      action={updateStudentProfile}
      className="space-y-4"
    >
      <input
        name="studentId"
        defaultValue={profile.studentId ?? ""}
        placeholder="Student ID"
        className="w-full p-3 rounded bg-zinc-900"
      />

      <input
        name="course"
        defaultValue={profile.course ?? ""}
        placeholder="Course"
        className="w-full p-3 rounded bg-zinc-900"
      />

      <input
        name="branch"
        defaultValue={profile.branch ?? ""}
        placeholder="Branch"
        className="w-full p-3 rounded bg-zinc-900"
      />

      <input
        name="graduationYear"
        defaultValue={
          profile.graduationYear ?? ""
        }
        placeholder="Graduation Year"
        className="w-full p-3 rounded bg-zinc-900"
      />

      <input
        name="skills"
        defaultValue={
          profile.skills.join(", ")
        }
        placeholder="Java, React, Node"
        className="w-full p-3 rounded bg-zinc-900"
      />

      <textarea
        name="bio"
        defaultValue={profile.bio ?? ""}
        placeholder="Bio"
        className="w-full p-3 rounded bg-zinc-900"
      />

      <input
        name="linkedinUrl"
        defaultValue={
          profile.linkedinUrl ?? ""
        }
        placeholder="LinkedIn URL"
        className="w-full p-3 rounded bg-zinc-900"
      />

      <input
        name="githubUrl"
        defaultValue={
          profile.githubUrl ?? ""
        }
        placeholder="GitHub URL"
        className="w-full p-3 rounded bg-zinc-900"
      />

      <button
        type="submit"
        className="w-full p-3 rounded bg-blue-600"
      >
        Update Profile
      </button>
    </form>
  </div>
</div>
```

</>);
}
