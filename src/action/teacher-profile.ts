"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { teacherProfileSchema } from "@/validation/teacher";

export async function saveTeacherProfile(
  formData: FormData
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const data = {
    department: formData.get(
      "department"
    ) as string,

    designation: formData.get(
      "designation"
    ) as string,
  };

  const result =
    teacherProfileSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error:
        result.error.errors[0]?.message,
    };
  }

  const validatedData = result.data;

  await prisma.teacherProfile.upsert({
    where: {
      userId: user.id,
    },

    update: {
      department:
        validatedData.department,

      designation:
        validatedData.designation,
    },

    create: {
      userId: user.id,

      department:
        validatedData.department,

      designation:
        validatedData.designation,
    },
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },

    data: {
      onboardingCompleted: true,
    },
  });

  redirect("/teacher/dashboard");
}