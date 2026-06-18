import {prisma} from "@/lib/prisma"


export async function getTeacherProfile(
    clerkId:string 
){
    console.log("fetching teacher profiles ....")
    console.log("Teacher clerk Id",clerkId)

    const user= await prisma.user.findUnique({
        where:{
            clerkId,
        },
        include:{
            teacherProfile:true
        }
    });
        
    if (!user) {
    console.log(
      "Teacher user not found"
    );

    return null;
  }

   console.log(
    "Teacher profile fetched successfully"
  );

  console.log(
    "Teacher Details:",
    user
  );

  return user;
}


export async function updateTeacherProfileByUserId(
    userId:string,
    data:{
        department?:string,
        designation?:string,
    }
){
console.log("userId",userId);
console.log("Update data ",data);

const profile= await prisma.teacherProfile.update({
    where:{
        userId,
    },
    data,
});
console.log(
    "Teacher Profile Updated Successfully"
  );

  return profile;
}