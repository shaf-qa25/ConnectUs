import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

type ResourceType = "image" | "video";

/**
 * Upload Buffer to Cloudinary
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string,
  resourceType: ResourceType
) {
  return new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(buffer);
  });
}

/**
 * Create Temporary Upload Record
 */
export async function createMediaUpload(data: {
  userId: string;
  uploadUrl: string;
  publicId: string;
  resourceType: ResourceType;
  size: number;
}) {
  return prisma.mediaUpload.create({
    data: {
      userId: data.userId,
      uploadUrl: data.uploadUrl,
      publicId: data.publicId,
      resourceType: data.resourceType,
      size: data.size,
      status: "PENDING",
    },
  });
}

/**
 * Mark Upload As Attached
 */
export async function markMediaAsAttached(
  mediaUploadId: string
) {
  return prisma.mediaUpload.update({
    where: {
      id: mediaUploadId,
    },
    data: {
      status: "ATTACHED",
    },
  });
}

/**
 * Delete Upload Record
 */
export async function deleteMediaUpload(
  mediaUploadId: string
) {
  return prisma.mediaUpload.delete({
    where: {
      id: mediaUploadId,
    },
  });
}

/**
 * Delete Asset From Cloudinary
 */
export async function deleteCloudinaryMedia(
  publicId: string,
  resourceType: ResourceType
) {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
}

/**
 * Delete Upload From Cloudinary + Database
 */
export async function deleteMediaCompletely(
  mediaUploadId: string
) {
  const media = await prisma.mediaUpload.findUnique({
    where: {
      id: mediaUploadId,
    },
  });

  if (!media) {
    return;
  }

  await deleteCloudinaryMedia(
    media.publicId,
    media.resourceType as ResourceType
  );

  await prisma.mediaUpload.delete({
    where: {
      id: mediaUploadId,
    },
  });
}