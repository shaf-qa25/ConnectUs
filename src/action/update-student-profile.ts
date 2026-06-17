"use server";

import { redirect } from "next/navigation";

import { studentProfileSchema }
from "@/validation/student";

import { getCurrentUser }
from "@/services/auth.service";

import {
  updateStudentProfileByUserId,
} from "@/services/student.service";

export async function updateStudentProfile(
  formData: FormData
) {
  try {
    const user =
      await getCurrentUser();

    const data = {
      studentId:
        formData.get("studentId") as string,

      course:
        formData.get("course") as string,

      branch:
        formData.get("branch") as string,

      graduationYear: Number(
        formData.get(
          "graduationYear"
        )
      ),

      skills: (
        formData.get(
          "skills"
        ) as string
      )
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),

      bio:
        formData.get("bio") as string,

      linkedinUrl:
        formData.get(
          "linkedinUrl"
        ) as string,

      githubUrl:
        formData.get(
          "githubUrl"
        ) as string,
    };

    const result =
      studentProfileSchema.safeParse(
        data
      );

    if (!result.success) {
      console.log(
        result.error.flatten()
      );

        return;
    //   return {
    //     success: false,
    //     error:
    //       result.error.errors[0]
    //         ?.message,
    //   };
    }

    await updateStudentProfileByUserId(
      user.id,
      result.data
    );

    console.log(
      "Profile updated successfully"
    );
  } catch (error) {
    console.log(
      "Update Error:",
      error
    );
      

    return ;
    // return {
    //   success: false,
    //   error:
    //     "Something went wrong",
    // };
  }

  redirect("/student/profile");
}