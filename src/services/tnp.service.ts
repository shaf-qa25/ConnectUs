import {prisma} from "@/lib/prisma"

export async function getTnpProfile(
    clerkId:string
){
  console.log("Fetching TNP profile ....");
  console.log("tnp user detail...=",clerkId)

     const user= await prisma.user.findUnique({
        where:{
            clerkId,
        },
        include:{
            tnpProfile:true
        }
     });

     if(!user){
        console.log("   TNP user not found ");
        return null;
     }

     console.log("TNP profile fetched successfully...");
     console.log("TNP detail ",user );

     return user;
}


export async function updateTnpProfileByUserId(
    userId:string,
    data:{
        officeRole?: string;
    contactNumber?: string;
    }
) {
  console.log(
    "Updating TNP Profile..."
  );

  console.log(
    "User ID:",
    userId
  );

  console.log(
    "Updated Data:",
    data
  );

  const profile =
    await prisma.tnpProfile.update({
      where: {
        userId,
      },

      data,
    });

  console.log(
    "TNP Profile Updated Successfully"
  );

  return profile;
}