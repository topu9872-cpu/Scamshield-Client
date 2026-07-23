import React from "react";

interface Step {
  id: number;
  title: string;
  description: string;
  isAi?: boolean;
}

export default function HowItWorks() {
  const steps: Step[] = [
    {
      id: 1,
      title: "Submit",
      description:
        "Paste a suspicious link, email, phone number, or message into ScamShield.",
    },
    {
      id: 2,
      title: "AI Analysis",
      description:
        "Our AI analyzes the content, checks for phishing patterns, and identifies potential threats.",
      isAi: true, 
    },
    {
      id: 3,
      title: "Get Results",
      description:
        "Receive a detailed safety report with recommendations to help you stay protected.",
    },
  ];

  return (
    <section className="py-20 bg-black text-zinc-100">
      <div className="w-11/12 mx-auto px-5">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Protect yourself from scams in just three simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative group rounded-2xl border border-zinc-600 bg-zinc-950/40 p-8 transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-950/80"
            >
              {/* Corner Step Index */}
              <div className="absolute top-4 right-6 text-sm font-mono font-bold text-zinc-800 select-none group-hover:text-zinc-700 transition-colors">
                0{step.id}
              </div>

              <div className="flex flex-col items-center text-center">
                {/* ScamShield Icon Container */}
                <div className="relative w-16 h-16 rounded-xl border border-zinc-800 bg-zinc-900/50 flex items-center justify-center mb-6 transition-colors group-hover:border-zinc-700">
                  <img
                    src="https://logos.ask.gov.sg/scamshield.png"
                    alt="ScamShield Icon"
                    className="h-7 w-7 object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Monospace Step Badge */}
                <span className="inline-block rounded-full border border-zinc-800 bg-zinc-900 px-3 py-0.5 text-xs font-mono tracking-wider text-zinc-400 mb-4">
                  STEP {step.id}
                </span>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>

                <p className="text-base text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}