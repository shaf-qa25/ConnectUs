import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  ArrowRight, 
  Users, 
  TrendingUp
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-zinc-950 font-sans text-zinc-100 transition-colors duration-300">
      
      {/* Ambient background glow effects */}
      <div className="absolute top-[-20%] left-[-10%] h-[700px] w-[700px] rounded-full bg-blue-600/5 blur-[130px]" />
      <div className="absolute bottom-[-10%] right-[-5%] h-[700px] w-[700px] rounded-full bg-cyan-600/5 blur-[130px]" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      {/* Modern Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-900/60 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 animate-pulse">
              <span className="text-xl font-bold tracking-tighter">C</span>
            </div>
            <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
              ConnectUs
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-blue-400 transition-colors duration-200">Features</a>
            <a href="#communities" className="hover:text-blue-400 transition-colors duration-200">Communities</a>
            <a href="#placements" className="hover:text-blue-400 transition-colors duration-200">Placements</a>
          </nav>

          {/* Authentication Actions */}
          <div className="flex items-center gap-4">
            <Show when="signed-out">
              <Link 
                href="/sign-in" 
                className="cursor-pointer px-4 py-2 text-sm font-semibold text-zinc-300 hover:text-white transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up" 
                className="cursor-pointer bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Started
              </Link>
            </Show>

            <Show when="signed-in">
              <Link 
                href="/dashboard" 
                className="cursor-pointer bg-linear-to-r from-blue-600/10 to-indigo-600/10 hover:from-blue-600/15 hover:to-indigo-600/15 text-blue-400 border border-blue-500/15 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 mr-2"
              >
                Go to Dashboard
              </Link>
              <div className="flex items-center justify-center p-0.5 rounded-full border border-zinc-800 bg-zinc-900/60 shadow-inner">
                <UserButton />
              </div>
            </Show>
          </div>
        </div>
      </header>

      {/* Main Hero & Content Section */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 py-16 sm:px-8 md:py-24">
        
        {/* Badge Intro */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-blue-500/15 bg-blue-500/5 px-4 py-1.5 text-xs font-semibold text-blue-400">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />
          Clerk Authentication Successfully Secured
        </div>

        {/* Dynamic Title */}
        <h1 className="max-w-4xl text-center text-5xl font-extrabold tracking-tight sm:text-7xl leading-none">
          Your College Network{" "}
          <span className="block bg-linear-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Starts Right Here.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-center text-base sm:text-lg leading-relaxed text-zinc-400">
          Connect with seniors, alumni, mentors, recruiters, and future co-founders. Handcrafted exclusively for students, founders, and Training & Placement cells.
        </p>

        {/* Premium Call to Action Area */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Show when="signed-out">
            <Link 
              href="/sign-up" 
              className="cursor-pointer bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 flex items-center gap-2"
            >
              Start Building Your Profile <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/sign-in" 
              className="cursor-pointer bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300"
            >
              Sign In to Your Account
            </Link>
          </Show>

          <Show when="signed-in">
            <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-4 flex flex-col sm:flex-row items-center gap-4 shadow-xl">
              <p className="text-sm font-semibold text-zinc-300">
                You are successfully logged in as an active member!
              </p>
              <Link 
                href="/dashboard"
                className="cursor-pointer text-xs font-extrabold uppercase tracking-wider text-blue-400 hover:text-blue-300 border border-blue-500/20 px-3 py-1.5 rounded-lg bg-blue-500/5 hover:bg-blue-500/10 transition-all duration-200"
              >
                Enter Protected Dashboard &rarr;
              </Link>
            </div>
          </Show>
        </div>

        {/* Live Mock Stats Panel - LinkedIn Inspired */}
        <section className="mt-16 w-full max-w-4xl p-1 rounded-2xl border border-zinc-900 bg-zinc-900/15 backdrop-blur-md shadow-md grid grid-cols-3 divide-x divide-zinc-900 text-center">
          <div className="py-4">
            <span className="block text-2xl sm:text-3xl font-extrabold text-white">4,800+</span>
            <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-semibold">Active Students</span>
          </div>
          <div className="py-4">
            <span className="block text-2xl sm:text-3xl font-extrabold text-blue-400">1,200+</span>
            <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-semibold">Alumni Mentors</span>
          </div>
          <div className="py-4">
            <span className="block text-2xl sm:text-3xl font-extrabold text-cyan-400">96.4%</span>
            <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-semibold">Placement Rate</span>
          </div>
        </section>

        {/* Feature Grid / Cards Section */}
        <section id="features" className="mt-24 w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Feature Card 1 */}
          <div className="group rounded-2xl border border-zinc-900 bg-zinc-900/10 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-lg font-bold text-white">Direct Alumni Mentorship</h3>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              Connect with seniors who walked your path. Unlock reference guidelines, internship routes, and career direction.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="group rounded-2xl border border-zinc-900 bg-zinc-900/10 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/20 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-lg font-bold text-white">Startup Co-Founder Finder</h3>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              Discover hackers, designers, and business operators within your campus. Filter by skills, graduation year, and domain interests.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="group rounded-2xl border border-zinc-900 bg-zinc-900/10 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/20 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-lg font-bold text-white">Placement Officer Insights</h3>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              Receive live broadcasts from the Training & Placement (TNP) desk. Keep tabs on recruitment standards, drives, and prep assets.
            </p>
          </div>

        </section>

      </main>

      {/* Styled Footer */}
      <footer className="w-full border-t border-zinc-900 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-8">
          <p className="text-xs text-zinc-600">
            &copy; 2026 ConnectUs. Handcrafted for Future Professionals. Secured by Clerk.
          </p>
          <div className="flex items-center gap-6 text-xs text-zinc-500">
            <a href="https://clerk.com/docs" target="_blank" className="hover:underline hover:text-zinc-300">Clerk Guides</a>
            <a href="https://prisma.io/docs" target="_blank" className="hover:underline hover:text-zinc-300">Prisma Schema</a>
            <a href="https://nextjs.org/docs" target="_blank" className="hover:underline hover:text-zinc-300">Next.js 16</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
