import { NextResponse } from "next/server";

import { getCurrentUser } from "@/services/auth.service";

import {
  getTeacherProfile,
  updateTeacherProfileByUserId,
} from "@/services/teacher.service";

// ====================
// GET Teacher Profile
// ====================

export async function GET() {
  try {
    console.log(
      "========== GET TEACHER PROFILE =========="
    );

    const user =
      await getCurrentUser();

    const teacher =
      await getTeacherProfile(
        user.clerkId
      );

    if (!teacher) {
      return NextResponse.json(
        {
          success: false,
          error: "Teacher not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    console.log(
      "GET TEACHER PROFILE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

// ====================
// UPDATE Teacher Profile
// ====================

export async function PUT(
  request: Request
) {
  try {
    console.log(
      "========== UPDATE TEACHER PROFILE =========="
    );

    const user =
      await getCurrentUser();

    const body =
      await request.json();

    await updateTeacherProfileByUserId(
      user.id,
      {
        department:
          body.department,

        designation:
          body.designation,
      }
    );

    return NextResponse.json({
      success: true,
      message:
        "Teacher profile updated successfully",
    });
  } catch (error) {
    console.log(
      "UPDATE TEACHER PROFILE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}