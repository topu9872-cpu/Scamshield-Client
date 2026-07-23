"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  Bookmark, 
  PlusCircle, 
  Search, 
  User, 
  ArrowUpRight, 
  Sparkles, 
  ShieldAlert,
  Bell
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { toast } from "sonner";

// --- USER-ONLY MOCK DATA (NO GLOBAL ADMIN DATA) ---
const personalMonthlyVolume = [
  { month: "Jan", myReports: 2 },
  { month: "Feb", myReports: 5 },
  { month: "Mar", myReports: 3 },
  { month: "Apr", myReports: 8 },
  { month: "May", myReports: 6 },
  { month: "Jun", myReports: 11 },
];

const privateActivityLedger = [
  { id: "SCM-902", entity: "Telegram Premium Bot Spoof", platform: "Telegram", status: "Pending", date: "July 07" },
  { id: "SCM-894", entity: "Solana Phantom Wallet Clone", platform: "Crypto / Web3", status: "Verified", date: "July 02" },
  { id: "SCM-841", entity: "Fake Amazon Overstock Liquidation", platform: "E-Commerce", status: "Verified", date: "June 24" },
  { id: "SCM-799", entity: "Instagram Meta Badge Phishing", platform: "Instagram", status: "Dismissed", date: "June 18" },
];

// --- SPRING ANIMATION VARIANTS (LINEAR/CLERK STYLE) ---
const containerSpring = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const blockSpring = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 17 } },
};

export default function UserDashboardOverview() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    toast.success("Secure Sync Active", {
      description: "Your personal file cabinet has been safely loaded.",
      icon: <Sparkles className="w-4 h-4 text-blue-400" />,
    });
  }, []);

  // Custom client-side framework to mimic a precise fluid running countup safely
  const FluidCountUp = ({ targetValue, duration = 1200 }) => {
    const [displayCount, setDisplayCount] = useState(0);
    
    useEffect(() => {
      let runStart = null;
      const stepFrame = (timestamp) => {
        if (!runStart) runStart = timestamp;
        const progressTime = Math.min((timestamp - runStart) / duration, 1);
        const cubicEaseOut = 1 - Math.pow(1 - progressTime, 3);
        setDisplayCount(Math.floor(cubicEaseOut * targetValue));
        if (progressTime < 1) window.requestAnimationFrame(stepFrame);
      };
      window.requestAnimationFrame(stepFrame);
    }, [targetValue, duration]);

    return <span>{displayCount.toLocaleString()}</span>;
  };

  if (!hasMounted) {
    return <div className="min-h-screen bg-[#050507]" />;
  }

  // Pure SVG Semi-Circular Gauge parameters (Resolution Rate: 78%)
  const resolutionPercentage = 78;
  const strokeRadius = 50;
  const circumference = 2 * Math.PI * strokeRadius;
  const strokeDashoffset = circumference - (resolutionPercentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#050507] text-neutral-100 p-4 md:p-8 font-sans selection:bg-blue-500/20 selection:text-blue-200 antialiased relative overflow-hidden">
      
      {/* Structural Refraction Glow Elements */}
      <div className="absolute top-0 left-1/4 w-150 h-88 bg-linear-to-br from-blue-600/10 to-purple-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-125 h-88 bg-linear-to-tr from-purple-600/5 to-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <motion.div 
        variants={containerSpring}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-8 relative z-10"
      >
        {/* --- WELCOME CONSOLE CONTROL HEADER --- */}
        <motion.header variants={blockSpring} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-400 tracking-widest uppercase font-mono bg-blue-500/5 border border-blue-500/10 px-2 py-0.5 rounded w-max">
              Account Console
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-transparent bg-linear-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text">
              Welcome back, Topu
            </h1>
            <p className="text-xs md:text-sm text-neutral-400">
              Manage your personal case profiles, track active investigation statuses, and flag suspicious entities.
            </p>
          </div>

          <div className="flex items-center gap-3 self-stretch md:self-auto">
            <button 
              onClick={() => toast.info("Your submitted alerts are fully up to date.")}
              className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-neutral-400 hover:text-white cursor-pointer"
            >
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5 bg-[#09090E]/80 backdrop-blur-md border border-white/10 pl-3 pr-4 py-1.5 rounded-xl text-xs text-neutral-300 shadow-xl">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-neutral-400 font-medium">Session Sync: Active</span>
            </div>
          </div>
        </motion.header>

        {/* --- PERSONAL STATS COUNTUP OVERVIEW --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "My Reports", count: 26, subtitle: "+3 filed this month", icon: <FileText className="text-blue-400" />, glowColor: "hover:border-blue-500/30" },
            { label: "Verified Claims", count: 18, subtitle: "Confirmed by platform", icon: <CheckCircle className="text-emerald-400" />, glowColor: "hover:border-emerald-500/30" },
            { label: "Pending Reports", count: 5, subtitle: "In verification queue", icon: <Clock className="text-amber-400" />, glowColor: "hover:border-amber-500/30" },
            { label: "Saved Signatures", count: 42, subtitle: "Platform watch items", icon: <Bookmark className="text-purple-400" />, glowColor: "hover:border-purple-500/30" }
          ].map((card) => (
            <motion.div 
              key={card.label} 
              variants={blockSpring} 
              whileHover={{ y: -2 }} 
              className="group cursor-pointer"
            >
              <div className={`border border-white/5 bg-[#09090E]/40 backdrop-blur-2xl p-5 rounded-2xl relative shadow-xl overflow-hidden flex justify-between items-start transition-all duration-300 ${card.glowColor}`}>
                <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:via-blue-500/40 transition-all duration-500" />
                <div className="space-y-3 relative z-10">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block font-mono">{card.label}</span>
                  <h2 className="text-3xl font-bold tracking-tight text-white font-mono">
                    <FluidCountUp targetValue={card.count} />
                  </h2>
                  <span className="text-[11px] text-neutral-500 block font-medium">{card.subtitle}</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:scale-105 group-hover:bg-white/10 transition-all duration-300 shadow-md">
                  {card.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- PERSONAL ANALYTICS GRID SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Monthly Submissions Area Curve */}
          <motion.div variants={blockSpring} className="lg:col-span-2 border border-white/5 bg-[#09090E]/40 backdrop-blur-2xl p-6 rounded-2xl shadow-xl hover:border-white/10 transition-colors group">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">My Monthly Report Analytics</h3>
                <p className="text-[11px] text-neutral-500 mt-0.5">Frequency matrix of malicious entities you flagged</p>
              </div>
              <div className="text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                Personal Log Timeline
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={personalMonthlyVolume} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="personalVolumeGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.02)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="#52525B" fontSize={11} tickLine={false} axisLine={false} dy={8} />
                  <YAxis stroke="#52525B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#09090E", borderColor: "rgba(255,255,255,0.08)", borderRadius: "12px", boxShadow: "0 20px 40px rgba(0,0,0,0.8)" }}
                    itemStyle={{ color: "#FFFFFF", fontSize: "12px", fontFamily: "monospace" }}
                    labelStyle={{ color: "#3B82F6", fontSize: "10px", fontFamily: "monospace", marginBottom: "2px" }}
                  />
                  <Area type="monotone" dataKey="myReports" stroke="#3B82F6" strokeWidth={2.5} fillOpacity={1} fill="url(#personalVolumeGlow)" dot={{ r: 3, strokeWidth: 1, fill: "#050507" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pure SVG Animated Resolution Radial Gauge */}
          <motion.div variants={blockSpring} className="border border-white/5 bg-[#09090E]/40 backdrop-blur-2xl p-6 rounded-2xl shadow-xl flex flex-col justify-between hover:border-white/10 transition-colors">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">Report Status Chart</h3>
              <p className="text-[11px] text-neutral-500 mt-0.5">Verification coefficient of your filed cases</p>
            </div>

            <div className="relative flex items-center justify-center py-6">
              <svg className="w-36 h-36 transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="72"
                  cy="72"
                  r={strokeRadius}
                  className="stroke-neutral-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Dynamic Neon Metric Fill */}
                <motion.circle
                  cx="72"
                  cy="72"
                  r={strokeRadius}
                  stroke="url(#radialSaaSGradiant)"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="radialSaaSGradiant" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute text-center">
                <span className="text-2xl font-black text-white font-mono tracking-tight">
                  {resolutionPercentage}%
                </span>
                <span className="block text-[9px] uppercase tracking-wider text-neutral-400 font-mono mt-0.5">
                  Resolved
                </span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Verified: 18</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Pending: 5</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* --- RECENT ACTIVITY LEDGER & INSTANT CALLOUT MATRIX --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Individual Report Ledger */}
          <motion.div variants={blockSpring} className="lg:col-span-2 border border-white/5 bg-[#09090E]/40 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-xl hover:border-white/10 transition-colors">
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">Recent Activity</h3>
                <p className="text-[11px] text-neutral-500 mt-0.5">Audit log of processing checkpoints for your filings</p>
              </div>
              <button 
                onClick={() => toast.info("Opening localized archive console view...")} 
                className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center gap-1 group/btn cursor-pointer"
              >
                View History <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-neutral-400 text-[10px] uppercase tracking-wider font-mono bg-white/5">
                    <th className="py-3 px-5 font-semibold">Incident Ref</th>
                    <th className="py-3 px-4 font-semibold">Target Entity</th>
                    <th className="py-3 px-4 font-semibold">Verification State</th>
                    <th className="py-3 px-5 text-right font-semibold">Filed</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-white/5 text-neutral-300">
                  {privateActivityLedger.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                      <td className="py-3.5 px-5 font-mono text-[11px] text-neutral-500 font-bold group-hover:text-blue-400 transition-colors">
                        {item.id}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-neutral-200 max-w-50 truncate">
                        {item.entity}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wide ${
                          item.status === "Verified" 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : item.status === "Pending"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-white/5 text-neutral-400 border border-white/10"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right text-neutral-500 font-mono">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Quick Actions Action Block Panel */}
          <div className="space-y-4 flex flex-col justify-between">
            <motion.div variants={blockSpring} className="border border-white/5 bg-[#09090E]/40 backdrop-blur-2xl p-5 rounded-2xl shadow-xl hover:border-white/10 transition-colors flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    { label: "Submit Report", desc: "Push new scam URL/wallet indicators", icon: <PlusCircle className="w-4 h-4 text-blue-400" />, action: () => toast.success("Opening signature filing layout...") },
                    { label: "Browse Reports", desc: "Search verified platform registries", icon: <Search className="w-4 h-4 text-purple-400" />, action: () => toast.info("Opening localized safe database mirrors...") },
                    { label: "Edit Profile", desc: "Update internal keys and account keys", icon: <User className="w-4 h-4 text-neutral-400" />, action: () => toast.warning("Requesting identity verification clearance...") }
                  ].map((actionItem) => (
                    <button 
                      key={actionItem.label} 
                      onClick={actionItem.action} 
                      className="w-full flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-left transition-all group relative overflow-hidden active:scale-[0.99] cursor-pointer"
                    >
                      <div className="p-2 bg-[#050507] border border-white/10 rounded-lg group-hover:scale-105 transition-transform">
                        {actionItem.icon}
                      </div>
                      <div className="truncate flex-1">
                        <h4 className="text-xs font-bold text-neutral-200 group-hover:text-white transition-colors">{actionItem.label}</h4>
                        <p className="text-[10px] text-neutral-500 truncate font-mono mt-0.5">{actionItem.desc}</p>
                      </div>
                      <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors text-xs font-mono pr-1">➔</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Premium Client Security Footnote */}
            <motion.div variants={blockSpring} className="border border-white/5 bg-white/5 p-4 rounded-xl flex items-start gap-3 text-[11px] text-neutral-400 leading-relaxed font-mono">
              <ShieldAlert className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
              <span>
                Metadata privacy rules enforced. Submissions are hashed into secure cryptographic values to mask submission signatures.
              </span>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}