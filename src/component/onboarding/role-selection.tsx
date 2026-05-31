"use client"
import { useRouter } from "next/navigation"
import { selectRole } from "@/action/onboarding "
import { button, div } from "framer-motion/client"

const roles=[
     "STUDENT",
     "ALUMNI",
     "TEACHER",
     "TNP",
]

export default function RoleSelection(){
    const router= useRouter();
    async function handelRoleSelection(role: string){
        try{
            await selectRole(role);
            switch(role){
                case "STUDENT":
                    router.push("/onboarding/student");
                    break ;

                case "ALUMNI":
                    router.push("/onboarding/alumni");
                    break;
                case "TEACHER":
                    router.push("/onboarding/teacher");
                    break;
               case "TNP":
                    router.push("/onboarding/tnp");
                break;        
            }
        }
        catch(error){
             console.log(error)
        }
    }
    return(
    <div  className="grid grid-cols-2 gap-4 mt-8">
        {roles.map((role)=>(
            <button key={role}
            onClick={()=>handelRoleSelection(role)}
              className="rounded-lg border border-zinc-700 p-4 hover:bg-zinc-800 transition">
            {role}
            </button>
        ))}
    </div>)
}