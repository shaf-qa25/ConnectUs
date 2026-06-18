import { NextResponse } from "next/server";

import { getCurrentUser } from "@/services/auth.service";

import { requireRole } from "@/lib/role-guard";
import {
  getStudentProfile,
  updateStudentProfileByUserId,
} from "@/services/student.service";

import { studentProfileSchema }
from "@/validation/student";


// GET PROFILE
export async function GET() {
  try {
    console.log(
      "========== GET STUDENT PROFILE =========="
    );

    const user =
      await getCurrentUser();

      await requireRole(
        user.clerkId,
        "STUDENT"
      )

    const student =
      await getStudentProfile(
        user.clerkId
      );

    if (
      !student ||
      !student.studentProfile
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Student profile not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.log(
      "GET PROFILE ERROR:",
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


// UPDATE PROFILE
export async function PUT(
  request: Request
) {
  try {
    console.log(
      "========== UPDATE STUDENT PROFILE =========="
    );

    const user =
      await getCurrentUser();

    const body =
      await request.json();

    const result =
      studentProfileSchema.safeParse(
        body
      );
       
    console.log("studentProfileSchema...",result);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors:
            result.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    await updateStudentProfileByUserId(
      user.id,
      result.data
    );

    return NextResponse.json({
      success: true,
      message:
        "Profile updated successfully",
    });
  } catch (error) {
    console.log(
      "UPDATE PROFILE ERROR:",
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