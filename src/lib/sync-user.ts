import { auth, currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";


export async function syncUser(){
    const {userId} =await  auth();
    console.log(userId)


      if (!userId) {
    return null;
  }

    const clerkUser = await currentUser();
    console.log(clerkUser)

    if (!clerkUser) {
    return null;
  }

  const existingUser= await prisma.user.findUnique({
    where:{
        clerkId: userId,
    }
  })

    if (existingUser) {
      console.log(existingUser)
    return existingUser;
  }


   const user=await prisma.user.create({
    data:{
        clerkId: userId,
        email:clerkUser.emailAddresses[0]?.emailAddress || "",
        username: clerkUser.username || "",
    }
   })
   return user;
}


