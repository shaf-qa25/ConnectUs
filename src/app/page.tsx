import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-zinc-50 font-sans text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      
      {/* Premium Background Glow Effects */}
      <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[120px] dark:bg-violet-500/5" />
      <div className="absolute bottom-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[120px] dark:bg-cyan-500/5" />

      {/* Modern Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/40 bg-zinc-50/80 backdrop-blur-md transition-colors duration-300 dark:border-zinc-800/40 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20">
              <span className="text-xl font-bold tracking-tighter">C</span>
            </div>
            <span className="bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-xl font-extrabold tracking-tight text-transparent dark:from-violet-400 dark:to-indigo-400">
              ConnectUs
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a href="#features" className="hover:text-violet-600 transition-colors duration-200 dark:hover:text-violet-400">Features</a>
            <a href="#security" className="hover:text-violet-600 transition-colors duration-200 dark:hover:text-violet-400">Security</a>
            <a href="#docs" className="hover:text-violet-600 transition-colors duration-200 dark:hover:text-violet-400">Documentation</a>
          </nav>

          {/* Authentication Actions */}
          <div className="flex items-center gap-4">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="cursor-pointer px-4 py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="cursor-pointer bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-violet-500/10 hover:shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
                  Get Started
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <a 
                href="#dashboard" 
                className="cursor-pointer bg-linear-to-r from-violet-600/10 to-indigo-600/10 hover:from-violet-600/15 hover:to-indigo-600/15 text-violet-600 border border-violet-500/10 dark:text-violet-400 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 mr-2"
              >
                Go to Dashboard
              </a>
              <div className="flex items-center justify-center p-0.5 rounded-full border border-zinc-200 dark:border-zinc-800">
                <UserButton />
              </div>
            </Show>
          </div>
        </div>
      </header>

      {/* Main Hero & Content Section */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 py-16 sm:px-8 md:py-24">
        
        {/* Badge Intro */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-violet-500/15 bg-violet-500/5 px-4 py-1.5 text-xs font-semibold text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/5 dark:text-violet-400 animate-pulse">
          <span className="flex h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400" />
          Clerk Authentication Configured Successfully
        </div>

        {/* Dynamic Title */}
        <h1 className="max-w-4xl text-center text-5xl font-extrabold tracking-tight sm:text-7xl">
          Secure, seamless connection{" "}
          <span className="block bg-linear-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-cyan-400">
            for your entire team.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-center text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
          ConnectUs handles authentication, sessions, and secure communication so you can focus on building features. Built with modern aesthetics, speed, and standard-grade security.
        </p>

        {/* Premium Call to Action Area */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <button className="cursor-pointer bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/35 transition-all duration-300 hover:-translate-y-1 active:translate-y-0">
                Start Building Free
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300">
                Explore Demo
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <div className="rounded-2xl bg-zinc-200/50 dark:bg-zinc-900/50 border border-zinc-300/40 dark:border-zinc-800/60 p-4 flex items-center gap-4 animate-fade-in">
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                You are signed in! Manage your profile details in the nav.
              </p>
            </div>
          </Show>
        </div>

        {/* Feature Grid / Cards Section */}
        <section id="features" className="mt-24 w-full grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Feature Card 1 */}
          <div className="group rounded-3xl border border-zinc-200/60 bg-white/50 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 group-hover:scale-110 transition-transform duration-300 dark:bg-violet-400/10 dark:text-violet-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-bold">Secure Authentication</h3>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Equipped with Clerk security shields, multi-factor login, and premium standard session management right out of the box.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="group rounded-3xl border border-zinc-200/60 bg-white/50 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 group-hover:scale-110 transition-transform duration-300 dark:bg-indigo-400/10 dark:text-indigo-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-bold">Team Environments</h3>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Create sub-networks, group user profiles, manage organization members, and control system authorization dynamically.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="group rounded-3xl border border-zinc-200/60 bg-white/50 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 group-hover:scale-110 transition-transform duration-300 dark:bg-cyan-400/10 dark:text-cyan-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-bold">Blazing Fast Speed</h3>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Server-rendered components dynamically cached globally. Optimized using the latest Next.js 16 App Router architecture.
            </p>
          </div>

        </section>

      </main>

      {/* Styled Footer */}
      <footer className="w-full border-t border-zinc-200/30 py-8 dark:border-zinc-800/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-8">
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            &copy; 2026 ConnectUs. Powered securely by Clerk.
          </p>
          <div className="flex items-center gap-6 text-xs text-zinc-500 dark:text-zinc-500">
            <a href="https://clerk.com/docs/guides/organizations/overview" target="_blank" className="hover:underline">Organizations</a>
            <a href="https://clerk.com/docs/reference/components/overview" target="_blank" className="hover:underline">Components</a>
            <a href="https://dashboard.clerk.com/" target="_blank" className="hover:underline">Dashboard</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
