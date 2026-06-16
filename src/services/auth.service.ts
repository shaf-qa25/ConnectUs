import { auth } from "@clerk/nextjs/server";
import {prisma} from "@/lib/prisma"

export async function getCurrentUser(){
    const {userId} = await auth();

    console.log( "Checking authenticated user...")

    if(!userId){

        throw new Error ("nauthenticated ...")

    }

    const user= await prisma.user.findUnique({
        where:{
            clerkId:userId,
        },
    })
     if (!user) {
    throw new Error("User not found");
  }
   console.log(
    "Authenticated User:",
    user.email
  );

  return user;
}