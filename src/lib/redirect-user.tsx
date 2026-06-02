import { UserRole } from "@prisma/client";


export function getDashboardRoute(
    role:UserRole
){
    switch(role){
          case "STUDENT":
      return "/student/dashboard";

    case "ALUMNI":
      return "/alumni/dashboard";

    case "TEACHER":
      return "/teacher/dashboard";

    case "TNP":
      return "/tnp/dashboard";

    default:
      return "/onboarding";
    }
}