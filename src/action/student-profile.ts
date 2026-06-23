"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { studentProfileSchema } from "@/validation/student";

export async function saveStudentProfile(formData: FormData) {
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

    skills: (formData.get("skills") as string)
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean),

    bio: formData.get("bio") as string,

    linkedinUrl: formData.get("linkedinUrl") as string,

    githubUrl: formData.get("githubUrl") as string,
  };

  // Zod Validation
  const result = studentProfileSchema.safeParse(data);

  if (!result.success) {
    console.log(result.error.flatten());

    return {
      success: false,
      error:
        result.error.issues[0]?.message ||
        "Validation failed",
    };
  }

  const validatedData = result.data;

  // Create or Update Student Profile
  await prisma.studentProfile.upsert({
    where: {
      userId: user.id,
    },

    update: {
      studentId: validatedData.studentId,
      course: validatedData.course,
      branch: validatedData.branch,
      graduationYear: validatedData.graduationYear,
      bio: validatedData.bio,
      skills: validatedData.skills,
      linkedinUrl: validatedData.linkedinUrl,
      githubUrl: validatedData.githubUrl,
    },

    create: {
      userId: user.id,
      studentId: validatedData.studentId,
      course: validatedData.course,
      branch: validatedData.branch,
      graduationYear: validatedData.graduationYear,
      bio: validatedData.bio,
      skills: validatedData.skills,
      linkedinUrl: validatedData.linkedinUrl,
      githubUrl: validatedData.githubUrl,
    },
  });

  // Mark onboarding complete
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      onboardingCompleted: true,
    },
  });

  redirect("/student/dashboard");
}