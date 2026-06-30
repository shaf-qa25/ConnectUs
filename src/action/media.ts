"use server";

import { prisma } from "@/lib/prisma";
import { MediaType, UploadStatus } from "@prisma/client";

type CreateMediaUploadInput = {
  userId: string;
  url: string;
  publicId: string;
  resourceType: MediaType;
  size: number;
};

export async function createMediaUpload(
  data: CreateMediaUploadInput
) {
  try {
    const media = await prisma.mediaUpload.create({
      data: {
        userId: data.userId,
        url: data.url,
        publicId: data.publicId,
        resourceType: data.resourceType,
        size: data.size,
      },
    });

    return {
      success: true,
      data: media,
    };
  } catch (error) {
    console.error(
      "Create Media Upload Error:",
      error
    );

    return {
      success: false,
      message: "Failed to save uploaded media.",
    };
  }
}


export async function getMediaUploadsByIds(
  ids: string[]
) {
  try {
    const uploads =
      await prisma.mediaUpload.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

    return {
      success: true,
      data: uploads,
    };
  } catch (error) {
    console.error(
      "Get Uploads Error:",
      error
    );

    return {
      success: false,
      message: "Unable to fetch uploads.",
    };
  }
}


export async function markUploadsAsUsed(
  ids: string[]
) {
  try {
    await prisma.mediaUpload.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        status: UploadStatus.USED,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Mark Upload Used Error:",
      error
    );

    return {
      success: false,
      message:
        "Unable to update upload status.",
    };
  }
}

export async function getMediaUpload(
  id: string
) {
  try {
    const upload =
      await prisma.mediaUpload.findUnique({
        where: {
          id,
        },
      });

    return {
      success: true,
      data: upload,
    };
  } catch (error) {
    console.error(
      "Get Media Upload Error:",
      error
    );

    return {
      success: false,
      message:
        "Unable to fetch upload.",
    };
  }
}

export async function verifyMediaOwnership(
  mediaIds: string[],
  userId: string
) {
  try {
    const uploads =
      await prisma.mediaUpload.findMany({
        where: {
          id: {
            in: mediaIds,
          },
        },
      });

    if (
      uploads.length !== mediaIds.length
    ) {
      return false;
    }

    return uploads.every(
      (upload) =>
        upload.userId === userId &&
        upload.status ===
          UploadStatus.UPLOADED
    );
  } catch (error) {
    console.error(
      "Ownership Check Error:",
      error
    );

    return false;
  }
}

export async function deleteMediaRecord(
  id: string
) {
  try {
    await prisma.mediaUpload.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Delete Media Record Error:",
      error
    );

    return {
      success: false,
      message:
        "Unable to delete media.",
    };
  }
}