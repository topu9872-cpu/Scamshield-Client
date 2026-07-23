"use client";

import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  ShieldAlert, 
  Clock, 
  CheckCircle, 
  Users, 
  PlusCircle, 
  Sliders, 
  UserX, 
  ArrowUpRight, 
  Command,
  Activity,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

// --- STATIC PRODUCTION MOCK DATA ---
const monthlyTrendData = [
  { name: "Jan", reports: 34 },
  { name: "Feb", reports: 62 },
  { name: "Mar", reports: 45 },
  { name: "Apr", reports: 98 },
  { name: "May", reports: 81 },
  { name: "Jun", reports: 142 },
];

const recentIncidents = [
  { id: "REP-402", title: "Meta Business Suite Verification Spoof", category: "Phishing", status: "Pending", date: "Jul 07" },
  { id: "REP-401", title: "Solana Raydium Liquidity Drainer", category: "Crypto", status: "Verified", date: "Jul 06" },
  { id: "REP-400", title: "Fake Amazon Clearance Merchant", category: "E-Commerce", status: "Verified", date: "Jul 05" },
  { id: "REP-399", title: "Telegram AI Signal Bot Exploitation", category: "Investment", status: "Pending", date: "Jul 04" },
];

const platformUsers = [
  { name: "Alex Mercer", email: "a.mercer@sec.io", status: "Enforcer", avatar: "AM" },
  { name: "Sarah Connor", email: "s.connor@cyber.net", status: "Moderator", avatar: "SC" },
  { name: "Vikram Singh", email: "v.singh@alpha.dev", status: "Admin", avatar: "VS" },
];

const categoryDistribution = [
  { name: "Phishing Vectors", value: 44, color: "#A855F7" },
  { name: "Crypto Drainers", value: 32, color: "#3B82F6" },
  { name: "E-Commerce Scams", value: 18, color: "#06B6D4" },
  { name: "Fake Investments", value: 25, color: "#6366F1" },
];

// --- STAGGERED MOTION FRAMEWORKS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};


const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// --- INLINE ELASTIC COUNT ENGINE ---
const Counter = ({ targetValue, duration = 1500 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = progress * (2 - progress);
      setCount(Math.floor(easeOutQuad * targetValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [targetValue, duration]);

  return <span>{count.toLocaleString()}</span>;
};

// --- UNIFIED DASHBOARD COMPONENT ---
const CompleteAdminDashboard = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    toast("Telemetry Matrix Active", {
      description: "Synchronized with global threat feeds.",
      icon: <Activity className="w-4 h-4 text-cyan-400" />,
    });
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#050508]" />;

  return (
    <div className="min-h-screen bg-[#050508] text-gray-100 p-4 md:p-8 font-sans relative overflow-hidden antialiased selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* High-Fidelity Ambient Lens Refractions */}
      <div className="absolute top-0 left-1/4 w-125 h-75 bg-linear-to-br from-purple-600/10 to-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-150 h-100 bg-linear-to-tr from-blue-600/5 to-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-8 relative z-10"
      >
        {/* Header Node */}
        <motion.header variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400">
              <Command className="w-3.5 h-3.5" /> Core Ops Infrastructure
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-linear-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Welcome, Admin Coordinator
            </h1>
            <p className="text-xs md:text-sm text-neutral-400">
              Real-time platform indexing and user-access orchestration metrics.
            </p>
          </div>
          <div className="flex items-center gap-2.5 text-xs bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-xl text-neutral-300 shadow-xl shadow-black/40 self-start sm:self-center">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-neutral-400">v4.15-live</span>
          </div>
        </motion.header>

        {/* --- 4 Animated Overview Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Total Reports", count: 3842, subtitle: "+12% from last cycle", icon: <ShieldAlert className="text-purple-400" />, glow: "hover:border-purple-500/20" },
            { title: "Pending Reports", count: 142, subtitle: "Requires active triage", icon: <Clock className="text-blue-400" />, glow: "hover:border-blue-500/20" },
            { title: "Verified Reports", count: 3420, subtitle: "89% validation rate", icon: <CheckCircle className="text-cyan-400" />, glow: "hover:border-cyan-500/20" },
            { title: "Total Users", count: 1284, subtitle: "Active authentication rings", icon: <Users className="text-indigo-400" />, glow: "hover:border-indigo-500/20" }
          ].map((card) => (
            <motion.div key={card.title} variants={itemVariants} className="group" whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
              <div className={`border border-white/10 bg-[#0A0A0F]/40 backdrop-blur-3xl p-5 md:p-6 rounded-2xl relative shadow-xl flex justify-between items-start transition-colors duration-300 ${card.glow} overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-linear-to-r from-transparent via-neutral-700 to-transparent group-hover:via-purple-500/40 transition-all duration-500" />
                <div className="space-y-2.5 relative z-10">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block font-mono">{card.title}</span>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white font-mono">
                    <Counter targetValue={card.count} />
                  </h2>
                  <span className="text-[11px] text-neutral-500 block font-medium">{card.subtitle}</span>
                </div>
                <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl group-hover:scale-105 group-hover:bg-white/10 transition-all duration-300 shadow-md">
                  {card.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Analytics Split Layer --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recharts Line Chart Block */}
          <motion.div variants={itemVariants} className="lg:col-span-2 border border-white/10 bg-[#0A0A0F]/50 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl hover:border-white/20 transition-colors group">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">Threat Ingestion Curve</h3>
                <p className="text-xs text-neutral-500">Volumetric assessment of submitted incident telemetry reports</p>
              </div>
              <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-neutral-400 group-hover:text-white transition-colors">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.03)" strokeDasharray="0" vertical={false} />
                  <XAxis dataKey="name" stroke="#52525B" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#52525B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0A0A0F", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", boxShadow: "0 20px 40px rgba(0,0,0,0.7)" }}
                    itemStyle={{ color: "#FFF", fontSize: "12px", fontFamily: "monospace" }}
                    labelStyle={{ color: "#A855F7", fontSize: "10px", fontFamily: "monospace", marginBottom: "4px" }}
                  />
                  <Line type="monotone" dataKey="reports" stroke="url(#cyanPurpleGradient)" strokeWidth={3} dot={{ r: 4, strokeWidth: 1, fill: "#050508" }} activeDot={{ r: 6, strokeWidth: 0 }} />
                  <defs>
                    <linearGradient id="cyanPurpleGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#A855F7" />
                      <stop offset="50%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recharts Pie Donut Engine */}
          <motion.div variants={itemVariants} className="border border-white/10 bg-[#0A0A0F]/50 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl flex flex-col justify-between hover:border-white/20 transition-colors">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">Vector Categorization</h3>
              <p className="text-xs text-neutral-500">Distribution framework of validated network scams</p>
            </div>

            <div className="h-44 w-full relative my-auto flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={74} paddingAngle={4} dataKey="value">
                    {categoryDistribution.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center pointer-events-none">
                <span className="text-xl font-bold tracking-tight text-white font-mono">3.8k</span>
                <p className="text-[9px] text-neutral-500 uppercase tracking-widest mt-0.5">Threats</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-white/10 pt-4 font-mono">
              {categoryDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2 bg-white/5 border border-white/10 p-2 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-neutral-400 truncate">{item.name.split(" ")[0]}</span>
                  <span className="text-white ml-auto font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* --- Registry Ledger & Commands Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Live Records Table */}
          <motion.div variants={itemVariants} className="lg:col-span-2 border border-white/10 bg-[#0A0A0F]/50 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-2xl hover:border-white/20 transition-colors">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">Live Incident Activity</h3>
                <p className="text-xs text-neutral-500">Real-time threat pipeline ingestion data logs awaiting action</p>
              </div>
              <button onClick={() => toast.info("Opening full telemetry data ledger...")} className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 font-semibold group/btn">
                Full Logs <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-neutral-400 text-[11px] uppercase tracking-wider font-mono bg-white/5">
                    <th className="py-3.5 px-6 font-medium">Incident Node</th>
                    <th className="py-3.5 px-4 font-medium">Vector</th>
                    <th className="py-3.5 px-4 font-medium">Status Check</th>
                    <th className="py-3.5 px-6 text-right font-medium">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-white/5 text-neutral-300">
                  {recentIncidents.map((report) => (
                    <tr key={report.id} className="hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-6 font-medium text-neutral-200 max-w-60 truncate">
                        <span className="font-mono text-neutral-500 text-[11px] mr-2 font-bold">{report.id}</span>
                        {report.title}
                      </td>
                      <td className="py-4 px-4 text-neutral-400 font-medium">{report.category}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono tracking-wide ${
                          report.status === "Verified" 
                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                            : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-neutral-500 font-mono">{report.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Right-hand Sidebar Modules */}
          <div className="space-y-6 flex flex-col justify-between">
            
            {/* Observers Cluster */}
            <motion.div variants={itemVariants} className="border border-white/10 bg-[#0A0A0F]/50 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl hover:border-white/20 transition-colors flex-1">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">Active System Observers</h3>
              <div className="space-y-3.5">
                {platformUsers.map((user) => (
                  <div key={user.email} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-linear-to-b from-neutral-800 to-neutral-950 border border-white/10 flex items-center justify-center text-[10px] font-black text-white shadow-inner font-mono">
                        {user.avatar}
                      </div>
                      <div className="truncate max-w-35">
                        <h4 className="text-xs font-bold text-neutral-200 truncate">{user.name}</h4>
                        <p className="text-[10px] text-neutral-500 font-mono truncate">{user.email}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-md text-neutral-400">
                      {user.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Platform Controls Overrides */}
            <motion.div variants={itemVariants} className="border border-white/10 bg-[#0A0A0F]/50 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl hover:border-white/20 transition-colors">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-3.5">Administrative Execution Overrides</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { label: "Review Incident Queue", icon: <PlusCircle className="w-3.5 h-3.5 text-purple-400" />, onClick: () => toast.success("Accessing security triage desk...") },
                  { label: "Configure Threat Taxonomies", icon: <Sliders className="w-3.5 h-3.5 text-blue-400" />, onClick: () => toast.warning("Modifying layout definitions requires Level 3 access.") },
                  { label: "Orchestrate Platform Identities", icon: <UserX className="w-3.5 h-3.5 text-cyan-400" />, onClick: () => toast.error("Revoking operational access nodes...") }
                ].map((action) => (
                  <button key={action.label} onClick={action.onClick} className="flex items-center gap-3 w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-left text-xs font-semibold text-neutral-300 hover:text-white transition-all group relative overflow-hidden active:scale-[0.99]">
                    <div className="p-2 bg-black/40 border border-white/10 rounded-lg group-hover:scale-105 transition-transform relative z-10">
                      {action.icon}
                    </div>
                    <span className="flex-1 relative z-10">{action.label}</span>
                    <span className="text-neutral-600 group-hover:text-neutral-300 transition-colors text-xs pr-1 relative z-10 font-mono">➔</span>
                  </button>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default CompleteAdminDashboard;