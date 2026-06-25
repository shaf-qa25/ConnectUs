import {z} from "zod"

export const postSchema=z.object({
    content:z.string().trim()
    .min(1,"more content is requitre")
    .max(5000,"max 5000 content is valid "),

      visibility:z.enum([
         "COLLEGE_ONLY",
          "PUBLIC"]
      ),

      images:z.array(z.string().url("Invalid image URL"))
      .max(5,"max 5 images At a time is allowed ")
       .default([]),


      videos:z.array(z.string().url("Invalid url "))
      .max(1,"max 1 video At a time is allowed ")
       .default([]),

    
})
export const updatePostSchema =
  postSchema.partial();