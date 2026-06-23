"use client";
import { useRouter } from "next/navigation";
import { selectRole } from "@/action/onboarding";
import { motion } from "framer-motion"; // Framer motion use kar rahe ho toh ye better hai

const roles = [
    { id: "STUDENT", label: "Student", desc: "Access campus network" },
    { id: "ALUMNI", label: "Alumni", desc: "Mentor and connect" },
    { id: "TEACHER", label: "Teacher", desc: "Manage academic path" },
    { id: "TNP", label: "T&P Cell", desc: "Manage placements" },
];

export default function RoleSelection() {
    const router = useRouter();

    async function handleRoleSelection(role: string) {
        try {
            await selectRole(role);
            router.push(`/onboarding/${role.toLowerCase()}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {roles.map((role) => (
                <button
                    key={role.id}
                    onClick={() => handleRoleSelection(role.id)}
                    className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 text-left hover:-translate-y-1 hover:border-purple-500/50"
                >
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                        {role.label}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                        {role.desc}
                    </p>
                </button>
            ))}
        </div>
    );
}