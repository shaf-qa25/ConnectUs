"use client";

import { useState } from "react";

import { saveAlumniProfile } from "@/action/alumni-profile";

export default function AlumniForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    formData: FormData
  ) {
    try {
      setLoading(true);

      await saveAlumniProfile(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4"
    >
      <input
        name="company"
        placeholder="Company"
        className="w-full p-3 rounded bg-zinc-900"
      />

      <input
        name="designation"
        placeholder="Designation"
        className="w-full p-3 rounded bg-zinc-900"
      />

      <input
        name="experienceYears"
        type="number"
        placeholder="Experience Years"
        className="w-full p-3 rounded bg-zinc-900"
      />

      <input
        name="linkedinUrl"
        placeholder="LinkedIn URL"
        className="w-full p-3 rounded bg-zinc-900"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full p-3 rounded bg-blue-600"
      >
        {loading
          ? "Saving..."
          : "Complete Profile"}
      </button>
    </form>
  );
}