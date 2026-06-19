import { NextResponse } from "next/server";

import { getCurrentUser } from "@/services/auth.service";

import {
  getTeacherProfile,
  updateTeacherProfileByUserId,
} from "@/services/teacher.service";

import { getTnpProfile,updateTnpProfileByUserId } from "@/services/tnp.service";
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

    const tnp =
      await  getTnpProfile(
        user.clerkId
      );

    if (!tnp) {
      return NextResponse.json(
        {
          success: false,
          error: "TNP not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: tnp,
    });
  } catch (error) {
    console.log(
      "GET TNP PROFILE ERROR:",
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

    await updateTnpProfileByUserId(
      user.id,
      {
               officeRole:
               body.officeRole,
   
              contactNumber:
              body.contactNumber,
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