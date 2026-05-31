"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function selectRole(role: string) {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      roleSelected: role as any,
    },
  });

  // Duplicate profile creation prevent
  if (role === "STUDENT") {
    const existing = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
    });

    if (!existing) {
      await prisma.studentProfile.create({
        data: {
          userId: user.id,
        },
      });
    }
  }

  if (role === "ALUMNI") {
    const existing = await prisma.alumniProfile.findUnique({
      where: { userId: user.id },
    });

    if (!existing) {
      await prisma.alumniProfile.create({
        data: {
          userId: user.id,
        },
      });
    }
  }

  if (role === "TEACHER") {
    const existing = await prisma.teacherProfile.findUnique({
      where: { userId: user.id },
    });

    if (!existing) {
      await prisma.teacherProfile.create({
        data: {
          userId: user.id,
        },
      });
    }
  }

  if (role === "TNP") {
    const existing = await prisma.tnpProfile.findUnique({
      where: { userId: user.id },
    });

    if (!existing) {
      await prisma.tnpProfile.create({
        data: {
          userId: user.id,
        },
      });
    }
  }

  return { success: true };
}