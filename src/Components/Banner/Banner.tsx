import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="hero min-h-[90vh] bg-black text-zinc-100 overflow-hidden relative">
      <div className="hero-content flex-col-reverse w-11/12 max-w-7xl mx-auto lg:flex-row-reverse gap-12 z-10 py-16">
        {/* Right Side */}
        <div className="flex-1 flex justify-center relative">
          {/* Subtle sharp white ring accent behind image instead of a color glow */}
          <div className="absolute inset-0 max-w-138 aspect-square rounded-2xl border border-zinc-800/50 scale-95 pointer-events-none" />
          
          <Image
            src="https://i.ibb.co.com/jY0915d/Safe-bro.png"
            alt="ScamShield"
            width={550}
            height={550}
            priority
            className="rounded-2xl relative z-10 filter brightness-95 contrast-105"
          />
        </div>

        {/* Left Side */}
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            AI Powered Protection
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
            Protect Yourself From
            <span className="text-zinc-400 block lg:inline"> Online Scams</span>
          </h1>

          <p className="py-6 text-lg text-zinc-400 max-w-xl">
            ScamShield helps you detect phishing links, fake messages,
            fraudulent websites, and suspicious phone numbers using
            AI-powered analysis.
          </p>

          <div className="flex gap-4">
            <Link 
              href="/scan" 
              className="px-6 py-3 rounded-lg bg-white font-medium text-black transition-all hover:bg-zinc-200 active:scale-95 text-center sm:w-auto"
            >
              Scan Now
            </Link>

            <Link 
              href="/learn" 
              className="px-6 py-3 rounded-lg border border-zinc-800 bg-zinc-900/50 font-medium text-zinc-300 transition-all hover:bg-zinc-900 hover:border-zinc-700 active:scale-95 text-center sm:w-auto"
            >
              Learn More
            </Link>
          </div>

          {/* Stats Section */}
          <div className="mt-10 flex gap-8 border-t border-zinc-900 pt-8">
            <div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">10K+</h3>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mt-1">
                Threats Detected
              </p>
            </div>

            <div className="border-l border-zinc-900 pl-8">
              <h3 className="text-3xl font-extrabold text-white tracking-tight">98%</h3>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mt-1">
                Accuracy Rate
              </p>
            </div>

            <div className="border-l border-zinc-900 pl-8">
              <h3 className="text-3xl font-extrabold text-emerald-400 tracking-tight">24/7</h3>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mt-1">
                Live Monitoring
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}