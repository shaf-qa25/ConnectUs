"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { tnpProfileSchema } from "@/validation/tnp";

export async function saveTnpProfile(
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
    officeRole: formData.get(
      "officeRole"
    ) as string,

    contactNumber: formData.get(
      "contactNumber"
    ) as string,
  };

  const result =
    tnpProfileSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error:
        result.error.errors[0]?.message,
    };
  }

  const validatedData = result.data;

  await prisma.tnpProfile.upsert({
    where: {
      userId: user.id,
    },

    update: {
      officeRole:
        validatedData.officeRole,

      contactNumber:
        validatedData.contactNumber,
    },

    create: {
      userId: user.id,

      officeRole:
        validatedData.officeRole,

      contactNumber:
        validatedData.contactNumber,
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

  redirect("/tnp/dashboard");
}