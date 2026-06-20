"use client";
import { useState } from "react";
import { saveStudentProfile } from "@/action/student-profile";

export default function StudentForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    try {
      setLoading(true);
      await saveStudentProfile(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Consistent input styling
  const inputStyle = "w-full p-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input name="studentId" placeholder="Student ID" className={inputStyle} required />
        <input name="course" placeholder="Course" className={inputStyle} required />
      </div>

      <input name="branch" placeholder="Branch" className={inputStyle} required />
      <input type="number" name="graduationYear" placeholder="Graduation Year" className={`${inputStyle} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`} required />
      <input name="skills" placeholder="Skills (e.g. React, Node.js)" className={inputStyle} />

      <textarea name="bio" placeholder="Bio" className={`${inputStyle} min-h-[100px]`} />

      <input type="url" name="linkedinUrl" placeholder="LinkedIn URL" className={inputStyle} />
      <input type="url" name="githubUrl" placeholder="GitHub URL" className={inputStyle} />

      <button
        type="submit"
        disabled={loading}
        className="w-full p-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all shadow-lg hover:shadow-purple-500/25"
      >
        {loading ? "Saving Profile..." : "Complete Profile"}
      </button>
    </form>
  );
}