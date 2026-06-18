import { NextApiResponse } from "next";
import { getCurrentUser } from "@/services/auth.service";
import { requireRole } from "@/lib/role-guard";
import { getAlumniProfile,updateAlumniProfileByUserId } from "@/services/alumni.service";
import { NextResponse } from "next/server";
import { success } from "zod";



// GET  Alumni profile ....
export async function GET(){
try {
      console.log(
      "========== GET ALUMNI PROFILE =========="
    );
    const user=await getCurrentUser();

    await requireRole(
        user.clerkId,
        "ALUMNI"
    )

    const alumni= await getAlumniProfile(
        user.clerkId
    );


    if (!alumni ||!alumni.alumniProfile 
){
        return NextResponse.json(
            {
                success:false,
                error:
                "Alumni profile not found "
            },
            {
                status:404
            }
        );
    }

    return NextResponse.json(
        {
    success:true,
    data:alumni,
    })
}  catch (error) {
    console.log(
      "GET ALUMNI PROFILE ERROR:",
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


//  update  Alumni Profile ....


export async function PUT(
    request:Request
){
     try {
        console.log("Updating Alumini profile.....")

        const user= await getCurrentUser();

        const body= await request.json();

        await updateAlumniProfileByUserId(
            user.id,
            {
                company:body.company,
                designation:body.designation,
                experienceYears:body.experienceYears,
                linkedinUrl:body.linkedinUrl
            }
        );

        return NextResponse.json({
            status:true,
            message:"Alumni profile updated successfully ...."
        });

    } catch (error) {
  
              console.log(
      "UPDATE ALUMNI PROFILE ERROR:",
      error
    );
  return NextResponse.json({

      success:false,
      error:"Internal Server Error"
      
  },
{
    status:500,
})
    }

}