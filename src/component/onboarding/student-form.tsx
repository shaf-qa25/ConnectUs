"use client";
import { useState } from "react";
import { saveStudentProfile } from "@/action/student-profile";

export default function StudentForm(){
    const[loading,setLoading]=useState(false);

    async function handleSubmit(formData :FormData){
        try{
            setLoading(true);
            await saveStudentProfile (formData)
        }
        catch(error){
            console.log(error)
        }finally {
      setLoading(false);
    }
    }
    return(
        <>
         <form action={handleSubmit} className="space-y-4">

      <input
        name="studentId"
        placeholder="Student ID"
        className="w-full p-3 rounded bg-zinc-900"
      />

      <input
        name="course"
        placeholder="Course"
        className="w-full p-3 rounded bg-zinc-900"
      />

      <input
        name="branch"
        placeholder="Branch"
        className="w-full p-3 rounded bg-zinc-900"
      />

    <input
  type="number"
  name="graduationYear"
  placeholder="Graduation Year"
  className="w-full p-3 rounded bg-zinc-900"
/>
      <input
  name="skills"
  placeholder="React, Node.js, Next.js"
  className="w-full p-3 rounded bg-zinc-900"
/>

      <textarea
        name="bio"
        placeholder="Bio"
        className="w-full p-3 rounded bg-zinc-900"
      />

     <input
  type="url"
  name="linkedinUrl"
  placeholder="LinkedIn URL"
  className="w-full p-3 rounded bg-zinc-900"
/>
    <input
  type="url"
  name="githubUrl"
  placeholder="GitHub URL"
  className="w-full p-3 rounded bg-zinc-900"
/>

      <button
        type="submit"
        disabled={loading}
        className="w-full p-3 rounded bg-blue-600"
      >
        {loading ? "Saving..." : "Complete Profile"}
      </button>

    </form>
        </>
    )
}