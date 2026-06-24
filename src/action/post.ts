import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { postSchema } from "@/validation/post";

type CreatePostInput = z.infer<typeof postSchema>;

export default async function createPost(
  data: CreatePostInput
) {
  try {
    // --------------------------
    // Authentication Check
    // --------------------------

    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    // --------------------------
    // User Check
    // --------------------------

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // --------------------------
    // Onboarding Check
    // --------------------------

    if (!user.onboardingCompleted) {
      return {
        success: false,
        message:
          "Complete onboarding before creating posts",
      };
    }

    // --------------------------
    // College Check
    // --------------------------

    if (!user.collegeId) {
      return {
        success: false,
        message:
          "User must belong to a college before posting",
      };
    }

    // --------------------------
    // Validation
    // --------------------------

    const validatedData = postSchema.parse(data);

    // --------------------------
    // Create Post
    // --------------------------

    const post = await prisma.post.create({
      data: {
        authorId: user.id,

        content: validatedData.content,

        visibility:
          validatedData.visibility,

        images: {
          create:
            validatedData.images?.map(
              (url) => ({
                imageUrl: url,
              })
            ) ?? [],
        },

        videos: {
          create:
            validatedData.videos?.map(
              (url) => ({
                videoUrl: url,
              })
            ) ?? [],
        },
      },

      include: {
        author: {
          select: {
            id: true,
            username: true,
            profileImageUrl: true,
            roleSelected: true,
          },
        },

        images: true,
        videos: true,
      },
    });

    return {
      success: true,
      post,
    };
  } catch (error) {
    console.error(
      "Create Post Error:",
      error
    );

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message:
          error.issues[0]?.message ??
          "Validation failed",
      };
    }

    return {
      success: false,
      message: "Failed to create post",
    };
  }
}