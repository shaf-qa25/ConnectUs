"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { alumniProfileSchema } from "@/validation/alumni";

export async function saveAlumniProfile(
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
   console.log(user);   // this is a basic check 
  const data = {
    company: formData.get("company") as string,

    designation: formData.get(
      "designation"
    ) as string,

    experienceYears: Number(
      formData.get("experienceYears")
    ),

    linkdinUrl: formData.get(
        "linkdinUrl"
    )as string,
  };

  const result =
    alumniProfileSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error:
        result.error.errors[0]?.message,
    };
  }

  const validatedData = result.data;
    
  console.log(validatedData); // formdata 
  
  await prisma.alumniProfile.upsert({
    where: {
      userId: user.id,
    },

    update: {
      company: validatedData.company,

      designation:
        validatedData.designation,

      experienceYears:
        validatedData.experienceYears,

        linkedinUrl:
    validatedData.linkedinUrl,
    },

    create: {
      userId: user.id,

      company: validatedData.company,

      designation:
        validatedData.designation,

      experienceYears:
        validatedData.experienceYears,

        linkedinUrl:
    validatedData.linkedinUrl,
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

  redirect("/alumni/dashboard");
}