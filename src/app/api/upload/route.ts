import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import cloudinary from "@/lib/cloudinary";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  IMAGE_MAX_SIZE,
  VIDEO_MAX_SIZE,
} from "@/lib/upload-config";
export const runtime = "nodejs";


// helper function  
function uploadToCloudinary(
  buffer: Buffer,
  folder: string,
  resourceType: "image" | "video"
) {
  return new Promise<any>((resolve, reject) => {
    const stream =
      cloudinary.uploader.upload_stream(
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

// actual post on cloudinary 
export async function POST(
  request: Request
) {
    console.log("POST HIT");
  try {
    console.log("POST HIT");
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const formData =
      await request.formData();
     console.log("FORM DATA RECEIVED");
    const file =
      formData.get("file");

    if (
      !file ||
      !(file instanceof File)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "No file provided",
        },
        { status: 400 }
      );
    }

    const isImage =
      ALLOWED_IMAGE_TYPES.includes(
        file.type
      );

    const isVideo =
      ALLOWED_VIDEO_TYPES.includes(
        file.type
      );
            console.log("FILE TYPE:", file.type);
console.log("FILE SIZE:", file.size);
    if (!isImage && !isVideo) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unsupported file type",
        },
        { status: 400 }
      );
    }

    if (
      isImage &&
      file.size > IMAGE_MAX_SIZE
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Image exceeds 5MB limit",
        },
        { status: 400 }
      );
    }

    if (
      isVideo &&
      file.size > VIDEO_MAX_SIZE
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Video exceeds 50MB limit",
        },
        { status: 400 }
      );
    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);
  
console.log("STARTING CLOUDINARY UPLOAD");
    const result =
      await uploadToCloudinary(
        buffer,
        "connectus/posts",
        isImage ? "image" : "video"
      );
console.log("CLOUDINARY SUCCESS");
    return NextResponse.json({
      success: true,

      url: result.secure_url,

      publicId:
        result.public_id,

      resourceType:
        result.resource_type,
    });
  } catch (error) {
    console.error(
      "Upload Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Upload failed",
      },
      { status: 500 }
    );
  }
}