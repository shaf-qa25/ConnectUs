"use client";

import { SignUp } from "@clerk/nextjs";
import { Shield, GraduationCap, Users, Compass } from "lucide-react";
import { motion } from "framer-motion";

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-zinc-950 font-sans text-zinc-100 overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[120px]" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-30" />

      <div className="relative w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        
        {/* Left Side: Premium LinkedIn-Inspired Branding Panel */}
        <div className="w-full lg:w-1/2 flex flex-col text-left space-y-8 lg:pr-8">
          
          {/* Logo / Brand Header */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <span className="text-2xl font-extrabold tracking-tighter">C</span>
            </div>
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
              ConnectUs
            </span>
          </div>

          {/* Core Value Proposition */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-none text-white">
              Launch Your <br />
              <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Professional Journey
              </span> <br />
              With Peers.
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-lg">
              Create an account and claim your college ecosystem. Explore mentorship circles, exclusive job matching boards, and team formation filters.
            </p>
          </div>

          {/* Quick Value Pillars */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-zinc-900 bg-zinc-900/30 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-200">Role Selection</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Profiles optimized for students & alumni.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-zinc-900 bg-zinc-900/30 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-200">Domain Hubs</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Web Dev, AI/ML, and Startup communities.</p>
              </div>
            </div>
          </div> */}

          {/* Security Badge */}
          {/* <div className="flex items-center gap-2 border border-zinc-900 bg-zinc-900/15 backdrop-blur-md py-1.5 px-3 rounded-full w-fit">
            <Shield className="h-4 w-4 text-blue-400" />
            <span className="text-xs text-zinc-500 font-medium">Secured by Clerk Standard-Grade Shield</span>
          </div> */}

        </div>

        {/* Right Side: Sleek Glassmorphic Auth Box */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative group w-full max-w-[400px]">
            {/* Glow border background effect */}
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/20 via-indigo-500/10 to-cyan-500/20 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-300" />
            
            <div className="relative bg-zinc-950/60 backdrop-blur-xl border border-zinc-900 shadow-2xl rounded-2xl overflow-hidden p-1.5">
              <SignUp
                appearance={{
                  elements: {
                    cardBox: "shadow-none border-none bg-transparent w-full",
                    card: "bg-transparent shadow-none p-5 sm:p-7 w-full",
                    headerTitle: "text-2xl font-bold tracking-tight text-white",
                    headerSubtitle: "text-zinc-400 text-sm mt-1.5",
                    socialButtonsBlockButton: "border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800/80 text-zinc-200 transition-all duration-200 rounded-xl",
                    socialButtonsBlockButtonText: "text-zinc-200 font-semibold text-sm",
                    dividerLine: "bg-zinc-800/50",
                    dividerText: "text-zinc-500 text-xs uppercase tracking-wider",
                    formFieldLabel: "text-zinc-300 font-semibold text-xs mb-1.5 uppercase tracking-wider",
                    formButtonPrimary: "cursor-pointer bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl py-3 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]",
                    footerActionText: "text-zinc-400 text-sm",
                    footerActionLink: "text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors duration-150",
                    formFieldInput: "bg-zinc-900/40 border border-zinc-800 text-white placeholder-zinc-500 rounded-xl focus:border-blue-500/50 focus:ring-blue-500/10 focus:ring-2 transition-all duration-200 py-3",
                    identityPreviewText: "text-zinc-300",
                    identityPreviewEditButton: "text-blue-400 hover:text-blue-300",
                    formResendCodeLink: "text-blue-400 hover:text-blue-300",
                  },
                  layout: {
                    socialButtonsPlacement: "top",
                    socialButtonsVariant: "iconButton",
                  },
                  variables: {
                    colorPrimary: "#2563eb",
                    colorText: "#f4f4f5",
                    colorBackground: "transparent",
                  }
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
