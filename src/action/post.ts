import { auth } from "@clerk/nextjs/server";
import { string, success, z } from "zod";

import { prisma } from "@/lib/prisma";
import { postSchema } from "@/validation/post";

type CreatePostInput = z.infer<typeof postSchema>;

export  async function createPost(
  data: CreatePostInput
) {
  try {
    // --------------------------
    // Authentication Check
    // --------------------------

    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    // --------------------------
    // User Check
    // --------------------------

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // --------------------------
    // Onboarding Check
    // --------------------------

    if (!user.onboardingCompleted) {
      return {
        success: false,
        message:
          "Complete onboarding before creating posts",
      };
    }

    // --------------------------
    // College Check
    // --------------------------

    if (!user.collegeId) {
      return {
        success: false,
        message:
          "User must belong to a college before posting",
      };
    }

    // --------------------------
    // Validation
    // --------------------------

    const validatedData = postSchema.parse(data);

    // --------------------------
    // Create Post
    // --------------------------

    const post = await prisma.post.create({
      data: {
        authorId: user.id,

        content: validatedData.content,

        visibility:
          validatedData.visibility,

        images: {
          create:
            validatedData.images?.map(
              (url) => ({
                imageUrl: url,
              })
            ) ?? [],
        },

        videos: {
          create:
            validatedData.videos?.map(
              (url) => ({
                videoUrl: url,
              })
            ) ?? [],
        },
      },

      include: {
        author: {
          select: {
            id: true,
            username: true,
            profileImageUrl: true,
            roleSelected: true,
          },
        },

        images: true,
        videos: true,
      },
    });

    return {
      success: true,
      post,
    };
  } catch (error) {
    console.error(
      "Create Post Error:",
      error
    );

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message:
          error.issues[0]?.message ??
          "Validation failed",
      };
    }

    return {
      success: false,
      message: "Failed to create post",
    };
  }
}


// get post 

// export  async function getFeedPost(){

//   try {
//     const {userId} =await auth();
  
//       if(!userId){
//         console.log("unauthorised user")
//         return{
//           status:false,
//           message:"unauthorised "
//         }
      
        
//       }
//       const user= await prisma.user.findUnique({
//         where:{
//          clerkId: userId  },
//         select:{
//           id:true,
//           college:true,
//           onboardingCompleted:true
//         }
//         })
     
//     if (!user) {
//       return {
//         success: false,
//         message: "User not found",
//       };
//     }

//     // --------------------------
//     // Onboarding Check
//     // --------------------------

//     if (!user.onboardingCompleted) {
//       return {
//         success: false,
//         message:
//           "Complete onboarding before accessign posts",
//       };
//     }

  
//         const posts= await prisma.post.findMany({
//           where:{
//             OR:[{

//               visibility:"PUBLIC"
//             },
//             {
//              visibility: "COLLEGE_ONLY",
//              author:{
//                collegeId:user.college,
//              },
//             },
//           ]},
//           include:{
//             author:{
//               select:{
//                 id:true,
//                 username:true,
//                 profileImageUrl:true,
//                 headline: true,
//                  roleSelected: true,
//               }
//             },
//             images:true,
//             videos:true
           
//           },
//           orderBy:{
//             createdAt:"desc"
//           },
//           take:20
//         })
//         return{
//           success:true,
//           posts,
//         }
//       }
    
//   catch (error) {
//     console.error(
//       "fetch  Post Error:",
//       error
//     );

  

//     return {
//       success: false,
//       message: "Failed to fetch post",
//     };
//   }
// }
export async function getFeedPost() {
try {
const { userId } = await auth();


if (!userId) {
  return {
    success: false,
    message: "Unauthorized",
  };
}

const user = await prisma.user.findUnique({
  where: {
    clerkId: userId,
  },
  select: {
    id: true,
    collegeId: true,
    onboardingCompleted: true,
  },
});

if (!user) {
  return {
    success: false,
    message: "User not found",
  };
}

if (!user.onboardingCompleted) {
  return {
    success: false,
    message:
      "Complete onboarding before accessing feed",
  };
}

const posts = await prisma.post.findMany({
  where: {
    OR: [
      {
        visibility: "PUBLIC",
      },

      {
        visibility: "COLLEGE_ONLY",

        author: {
          collegeId: user.collegeId,
        },
      },
    ],
  },

  include: {
    author: {
      select: {
        id: true,
        username: true,
        profileImageUrl: true,
        headline: true,
        roleSelected: true,
      },
    },

    images: true,
    videos: true,
  },

  orderBy: {
    createdAt: "desc",
  },

  take: 20,
});

return {
  success: true,
  posts,
};


} catch (error) {
console.error(
"Get Feed Error:",
error
);


return {
  success: false,
  message: "Failed to fetch feed",
};


}
}




export async function getPostById(
  postId: string
) {
  try {
    // --------------------------
    // Authentication
    // --------------------------

    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    // --------------------------
    // User Check
    // --------------------------

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        id: true,
        collegeId: true,
        onboardingCompleted: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // --------------------------
    // Onboarding Check
    // --------------------------

    if (!user.onboardingCompleted) {
      return {
        success: false,
        message:
          "Complete onboarding first",
      };
    }

    // --------------------------
    // Validate Post Id
    // --------------------------

    if (!postId?.trim()) {
      return {
        success: false,
        message: "Post id is required",
      };
    }

    // --------------------------
    // Fetch Post
    // --------------------------

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },

      include: {
        author: {
          select: {
            id: true,
            username: true,
            profileImageUrl: true,
            headline: true,
            roleSelected: true,
            collegeId: true,
          },
        },

        images: true,
        videos: true,
      },
    });

    if (!post) {
      return {
        success: false,
        message: "Post not found",
      };
    }

    // --------------------------
    // Visibility Check
    // --------------------------

    if (
      post.visibility ===
      "COLLEGE_ONLY"
    ) {
      if (
        !user.collegeId ||
        user.collegeId !==
          post.author.collegeId
      ) {
        return {
          success: false,
          message:
            "You are not allowed to view this post",
        };
      }
    }

    return {
      success: true,
      post,
    };
  } catch (error) {
    console.error(
      "Get Post By Id Error:",
      error
    );

    return {
      success: false,
      message: "Failed to fetch post",
    };
  }
}
