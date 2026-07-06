import { FaBolt, FaRobot, FaShieldAlt, FaLock } from "react-icons/fa";

const WhyChoose = () => {
  const features = [
    {
      title: "AI-Powered Detection",
      description:
        "Advanced AI analyzes links, messages, and websites to identify potential scams quickly.",
      icon: <FaRobot className="text-2xl text-white" />,
    },
    {
      title: "Fast Analysis",
      description:
        "Receive detailed scam detection results within seconds, saving you time and keeping you safe.",
      icon: <FaBolt className="text-2xl text-white" />,
    },
    {
      title: "Privacy First",
      description:
        "Your submitted data is processed securely and is never shared with third parties.",
      icon: <FaLock className="text-2xl text-white" />,
    },
    {
      title: "Reliable Protection",
      description:
        "Stay protected against phishing, fake websites, and online fraud with continuous monitoring.",
      icon: <FaShieldAlt className="text-2xl text-white" />,
    },
  ];

  return (
    <section className="py-20 bg-black text-zinc-100">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Why Choose <span className="text-zinc-400">ScamShield?</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-400">
            ScamShield combines AI technology with cybersecurity best practices
            to help you detect online scams before they become a problem.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-zinc-500 bg-zinc-950/40 p-6 transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-950/80"
            >
              <div className="flex flex-col items-center text-center">
                {/* Minimalist Icon Wrapper */}
                <div className="w-14 h-14 rounded-xl border border-zinc-800 bg-zinc-900/50 flex items-center justify-center mb-5 transition-colors group-hover:border-zinc-700">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;