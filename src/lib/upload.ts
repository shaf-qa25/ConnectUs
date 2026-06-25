// export async function uploadFile(
//   file: File
// ) {
//   try {
//     const formData = new FormData();

//     formData.append("file", file);

//     const response = await fetch(
//       "/api/upload",
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     const data =
//       await response.json();

//     if (!response.ok) {
//       throw new Error(
//         data.message ||
//           "Upload failed"
//       );
//     }

//     return data;
//   } catch (error) {
//     console.error(
//       "Upload File Error:",
//       error
//     );

//     throw error;
//   }
// }

// src/lib/upload.ts

export type UploadResponse = {
  success: boolean;
  url: string;
  publicId: string;
  resourceType: "image" | "video";
};

export async function uploadFile(
  file: File
): Promise<UploadResponse> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    "/api/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Upload failed"
    );
  }

  return data;
}