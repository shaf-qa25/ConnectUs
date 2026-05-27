import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";


export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-zinc-950 font-sans text-zinc-100 transition-colors duration-300">
      
      {/* Ambient background glow effects */}
      {/* <div className="absolute top-[-20%] left-[-10%] h-[700px] w-[700px] rounded-full bg-blue-600/5 blur-[130px]" />
      <div className="absolute bottom-[-10%] right-[-5%] h-[700px] w-[700px] rounded-full bg-cyan-600/5 blur-[130px]" />
       */}
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      {/* Modern Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-900/60 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
          
          {/* Logo / Brand */}
          {/* <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 animate-pulse">
              <span className="text-xl font-bold tracking-tighter">C</span>
            </div>
            <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
              ConnectUs
            </span>
          </div> */}

          {/* Navigation Links */}
          {/* <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-blue-400 transition-colors duration-200">Features</a>
            <a href="#communities" className="hover:text-blue-400 transition-colors duration-200">Communities</a>
            <a href="#placements" className="hover:text-blue-400 transition-colors duration-200">Placements</a>
          </nav> */}

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
      

      {/* Styled Footer */}
     

    </div>
  );
}
