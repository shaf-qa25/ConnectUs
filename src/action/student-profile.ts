"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { studentProfileSchema } from "@/validation/student";


export async function saveStudentProfile(formData: FormData){
    const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Clerk user ko DB user se map karo
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Form data extract karo
  const data = {
    studentId: formData.get("studentId") as string,
    course: formData.get("course") as string,
    branch: formData.get("branch") as string,
    graduationYear: Number(
      formData.get("graduationYear")
    ),
    bio: formData.get("bio") as string,
    linkedinUrl: formData.get("linkedinUrl") as string,
    githubUrl: formData.get("githubUrl") as string,
  };
  //Zod validation .../
  const result = studentProfileSchema.safeParse(data);

  if(!result.success){
    console.log(result.error.flatten());

    throw new Error(
      result.error.errors[0]?.message ||
        "Validation failed"
    );



    const ValidateData= result.data;

    /// Student file update 

    await prisma.studentProfile.update({
        where:{
            userId:user.id,
        },
        data:{
            studentId:ValidateData?.studentId,
            course: ValidateData?.course,
            branch: ValidateData?.branch,
           graduationYear: ValidateData?.graduationYear,
            bio: ValidateData?.bio,
          linkdinUrl:ValidateData?.linkdinUrl,
             githubUrl: ValidateData?.githubUrl,
        }
    })
  }
   await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      onboardingCompleted: true,
    },
  });

  redirect("/dashboard");
}