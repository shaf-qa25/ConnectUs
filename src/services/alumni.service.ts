import {prisma} from "@/lib/prisma"



export async function getAlumniProfile(
    clerkId:string 
){

    console.log("fetching  Alumni profile .....");
    console.log("Alumni clerId=",clerkId);
    const user = await prisma.user.findUnique(
        {
            where:{
                clerkId,
            },
            include:{
                alumniProfile:true
            }
        }
    )

    if(!user){
        console.log("Alumni not found ");
        return null;
    }

    return user;
    
}



// update Alumni Profile ...
    export async function updateAlumniProfileByUserId(
        userId:string,
        data:{
            company?:string;
            designation?:string;
            experienceYears?:number;
            linkedinUrl? :string
        }
        
    ){
        console.log("Updating Alumini profile .....") ;

        return prisma.alumniProfile.update({
            where:{
                userId,
            },
            data,
        });
    }