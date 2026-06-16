import {prisma} from "@/lib/prisma"

export async function getStudentProfile(
    clerkId:string
){

    console.log("fetching student profile .....");
    console.log("clerId",clerkId);
    const user= await prisma.user.findUnique({
        where:{
            clerkId,
        },
        include:{
            studentProfile:true
        },
    });
    if(!user){
        console.log("User not found ")
    }

    console.log("student Profile fetched successfully ");
    console.log("student-detail..", user );
    return user;
}


export async function updateStudentProfileByUserId(
  userId: string,
  data: {
    studentId: string;
    course: string;
    branch: string;
    graduationYear: number;
    skills: string[];
    bio?: string;
    linkedinUrl?: string;
    githubUrl?: string;
  }
) {
  console.log(
    "Updating profile for user:",
    userId
  );

  return prisma.studentProfile.update({
    where: {
      userId,
    },
    data,
  });
}