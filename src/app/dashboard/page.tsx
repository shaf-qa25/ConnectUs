import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Lock, 
  LogOut, 
  Rss, 
  Globe, 
  ShieldAlert,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

// Define the architecture for future roles
export type UserRole = "student" | "alumni" | "teacher" | "tnp";

interface RoleMetadata {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badgeBg: string;
  badgeText: string;
}

const ROLE_ARCHITECTURES: Record<UserRole, RoleMetadata> = {
  student: {
    title: "Student Networker",
    description: "Connect with alumni, seek referrals, share accomplishments, upload resumes, and join tech communities.",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400",
  },
  alumni: {
    title: "Alumni Mentor",
    description: "Provide mentorship, share startup insights, post hire announcements, and refer student candidates.",
    icon: Briefcase,
    color: "from-purple-500 to-indigo-500",
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-400",
  },
  teacher: {
    title: "Academic Supervisor",
    description: "Guide research, review papers, coordinate department initiatives, and interact with students & alumni.",
    icon: Award,
    color: "from-emerald-500 to-teal-500",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400",
  },
  tnp: {
    title: "T&P Administrator",
    description: "Manage placement drives, publish official stats, coordinate with recruiters, and broadcast placement notices.",
    icon: ShieldAlert,
    color: "from-rose-500 to-orange-500",
    badgeBg: "bg-rose-500/10",
    badgeText: "text-rose-400",
  },
};

export default async function DashboardPage() {
  // Retrieve the authenticated user server-side using Clerk's production-best practices
  const user = await currentUser();

  // If no user is logged in, redirect them (handled by middleware but added as secondary safety)
  if (!user) {
    redirect("/sign-in");
  }

  // Fallbacks for display
  const name = user.firstName ? `${user.firstName} ${user.lastName || ""}` : "ConnectUs Member";
  const email = user.emailAddresses[0]?.emailAddress || "no-email@connectus.edu";
  const imageUrl = user.imageUrl;

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 font-sans overflow-hidden pb-16">
      
      {/* Background radial ambient lights */}
      <div className="absolute top-[-10%] left-[-15%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[130px] opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[130px] opacity-60" />

      {/* Header / Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <span className="text-xl font-bold tracking-tighter">C</span>
            </div>
            <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
              ConnectUs
            </span>
          </Link>

          {/* Quick Internal Nav Links */}
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <span className="text-blue-400 font-semibold">Dashboard</span>
            <span className="cursor-not-allowed hover:text-zinc-300 transition-colors duration-150">General Feed</span>
            <span className="cursor-not-allowed hover:text-zinc-300 transition-colors duration-150">Communities</span>
          </nav>

          {/* Clerk User Button */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col text-right hidden sm:block">
              <span className="text-xs text-zinc-500">Authenticated Session</span>
              <span className="text-sm font-semibold text-zinc-200">{name}</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/60 p-0.5 shadow-inner">
              <UserButton />
            </div>
          </div>

        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        
        {/* Welcome Section */}
        

        {/* Core Layout Grid: Left Details / Right Architectures */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Clerk Session Card */}
          <div className="lg:col-span-1 space-y-6">
            
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/30 backdrop-blur-md p-6 shadow-md">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-400" />
                Session Information
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="border-b border-zinc-900 pb-3">
                  <span className="block text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Clerk Account ID</span>
                  <span className="font-mono text-zinc-300 break-all">{user.id}</span>
                </div>

                <div className="border-b border-zinc-900 pb-3">
                  <span className="block text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Primary Email Address</span>
                  <span className="text-zinc-300 font-medium">{email}</span>
                </div>

                <div className="border-b border-zinc-900 pb-3">
                  <span className="block text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Auth Method</span>
                  <span className="text-zinc-300 font-medium capitalize flex items-center gap-2">
                    {user.externalAccounts.length > 0 ? (
                      <>
                        <Globe className="h-4 w-4 text-cyan-400" />
                        Google OAuth 2.0
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 text-indigo-400" />
                        Email & Password
                      </>
                    )}
                  </span>
                </div>

                <div className="pt-2">
                  <span className="block text-xs text-zinc-500 uppercase tracking-wider mb-2">Clerk Account Creation</span>
                  <span className="text-zinc-400 text-xs">
                    Registered: {new Date(user.createdAt).toLocaleDateString()} at {new Date(user.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Placement Feed Alert Card */}
            <div className="rounded-2xl border border-zinc-900 bg-linear-to-br from-zinc-900/50 to-blue-950/20 backdrop-blur-md p-6 shadow-md relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-10%] h-[120px] w-[120px] rounded-full bg-blue-500/10 blur-xl group-hover:scale-125 transition-transform duration-300" />
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
                <TrendingUp className="h-4 w-4" />
                Ecosystem Metrics
              </div>
              <h4 className="text-base font-bold text-white mb-2">Preparation Checklist</h4>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Now that authentications are linked, next steps involve deploying PostgreSQL schemas via Prisma ORM.
              </p>
              <div className="w-full bg-zinc-900/50 rounded-full h-1.5 mb-2 overflow-hidden border border-zinc-800">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "35%" }}></div>
              </div>
              <span className="text-[10px] text-zinc-500">Integration Progress: 35% Completed</span>
            </div>

          </div>

          {/* Right Columns: Preparing Role Architectures */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/30 backdrop-blur-md p-6 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-blue-400" />
                    Role-Based Architecture Preparation
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    ConnectUs will dynamically route permissions and profile visuals based on these designated roles.
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-xs text-zinc-400 font-semibold self-start md:self-center">
                  Prisma Schemas Ready
                </div>
              </div>

              {/* Roles Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(Object.keys(ROLE_ARCHITECTURES) as UserRole[]).map((role) => {
                  const meta = ROLE_ARCHITECTURES[role];
                  const Icon = meta.icon;
                  return (
                    <div 
                      key={role}
                      className="group relative rounded-xl border border-zinc-900 bg-zinc-950/40 p-5 transition-all duration-300 hover:border-zinc-800 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                    >
                      {/* Gradient border indicator */}
                      <div className="absolute top-0 left-0 w-1.5 h-full rounded-l-xl bg-linear-to-b opacity-60 group-hover:opacity-100 transition-opacity duration-300 bg-blue-500" />

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-zinc-900 text-zinc-300 group-hover:text-blue-400 transition-colors duration-250`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <h4 className="text-sm font-extrabold text-zinc-200 uppercase tracking-wide group-hover:text-white transition-colors duration-200">
                            {meta.title}
                          </h4>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${meta.badgeBg} ${meta.badgeText}`}>
                          {role}
                        </span>
                      </div>
                      
                      <p className="text-xs text-zinc-400 leading-relaxed pr-2">
                        {meta.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Architecting description banner */}
              <div className="mt-6 flex gap-3 p-4 rounded-xl border border-zinc-900 bg-zinc-900/20 text-xs text-zinc-400 leading-relaxed">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0 animate-ping" />
                <div>
                  <span className="font-semibold text-zinc-300 block mb-0.5">Database Scale Hook ready:</span>
                  Each Clerk User ID is structured to link to a matching record in the PostgreSQL database. When the signup hook executes, Clerk's webhook writes profile metadata back, locking in the chosen role for permission scopes across General, Alumni, and TNP channels.
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
