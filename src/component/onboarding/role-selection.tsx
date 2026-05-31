"use client"

import { button, div } from "framer-motion/client"

const roles=[
     "STUDENT",
     "ALUMNI",
     "TEACHER",
     "TNP",
]

export default function RoleSelection(){
    return(
    <div  className="grid grid-cols-2 gap-4 mt-8">
        {roles.map((role)=>(
            <button key={role}
              className="rounded-lg border border-zinc-700 p-4 hover:bg-zinc-800 transition">
            {role}
            </button>
        ))}
    </div>)
}