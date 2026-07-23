"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertTriangle, 
  ShieldAlert, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  Layers, 
  Globe, 
  TrendingUp,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

// --- FRAUD INTEL ARCHITECTURE ---
const initialReports = [
  { id: "REP-401", source: "Phishing Site", target: "https://secure-scamshield-auth.com", date: "Just now", status: "Critical", confidence: "98%" },
  { id: "REP-402", source: "Sms Smishing", target: "+1 (555) 019-2831 [MFA Spoof]", date: "4m ago", status: "High", confidence: "84%" },
  { id: "REP-403", source: "Malware Host", target: "203.0.113.42/payload.exe", date: "18m ago", status: "High", confidence: "91%" },
  { id: "REP-404", source: "Social Fraud", target: "Fake Support Node @X_Care_Matrix", date: "1h ago", status: "Medium", confidence: "62%" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
};

const ScamReportsDashboard = () => {
  const [reports, setReports] = useState(initialReports);
  const [filter, setFilter] = useState("ALL");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    toast("Threat Feed Active", {
      description: "Live packet analysis engine reporting 0ms lag.",
      icon: <Layers className="w-4 h-4 text-amber-400" />,
    });
  }, []);

  // --- ACTION CONTROLS ---
  const handleApproveBlock = (id, target) => {
    setReports(prev => prev.filter(rep => rep.id !== id));
    toast.success("Threat Blocklisted", {
      description: `${target} pushed to edge proxy firewalls.`,
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
    });
  };

  const handleDismiss = (id) => {
    setReports(prev => prev.filter(rep => rep.id !== id));
    toast.info("Report Dismissed", {
      description: `Report ${id} closed and marked as low risk.`
    });
  };

  const handleInspect = (id) => {
    toast(`Opening Deep Inspection Layer`, {
      description: `Fetching reverse DNS and payload headers for ${id}.`,
      icon: <Eye className="w-4 h-4 text-blue-400" />
    });
  };

  const handleResetFeed = () => {
    setReports(initialReports);
    toast.info("Intel Feed Refreshed", { description: "Simulation sample vectors reloaded." });
  };

  const filteredReports = filter === "ALL" 
    ? reports 
    : reports.filter(r => r.status.toUpperCase() === filter);

  if (!mounted) return <div className="min-h-screen bg-[#07070a]" />;

  return (
    <div className="min-h-screen bg-[#07070a] text-gray-100 p-4 md:p-8 font-sans relative overflow-hidden antialiased selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 w-125 h-75 bg-linear-to-bl from-amber-600/10 to-rose-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-12 left-1/4 w-[125 h-75 bg-linear-to-tr from-purple-600/5 to-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-8 relative z-10"
      >
        {/* Main Section Header */}
        <motion.header variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <ShieldAlert className="w-3.5 h-3.5" /> Telemetry Intake Node
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-linear-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Scam Infrastructure Desk
            </h1>
            <p className="text-xs md:text-sm text-neutral-400">
              Live ingest tracking domain hijacking, active smishing payloads, and targeted fraud vectors.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-center whitespace-nowrap">
            <button 
              onClick={handleResetFeed}
              className="p-2 bg-white/5 border border-white/10 rounded-xl text-neutral-400 hover:text-white transition-colors"
              title="Reset Live Feed"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="font-mono text-neutral-400">Feed: Operational</span>
            </div>
          </div>
        </motion.header>

        {/* Metric Grid summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Aggregated Incident Pool", count: "1,249", label: "Active network reports", icon: <AlertTriangle className="text-amber-400" /> },
            { title: "Avg Resolution Triage", count: "4.8m", label: "Packet interception rate", icon: <TrendingUp className="text-emerald-400" /> },
            { title: "Active Blocked Endpoints", count: "42.9k", label: "Edge proxies synced", icon: <Globe className="text-purple-400" /> }
          ].map((m) => (
            <motion.div key={m.title} variants={itemVariants} className="border border-white/10 bg-[#0E0E14]/40 backdrop-blur-3xl p-5 rounded-2xl flex justify-between items-start whitespace-nowrap">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono block">{m.title}</span>
                <h2 className="text-2xl font-black tracking-tight text-white font-mono">{m.count}</h2>
                <span className="text-[11px] text-neutral-500 block">{m.label}</span>
              </div>
              <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl shrink-0">{m.icon}</div>
            </motion.div>
          ))}
        </div>

        {/* Single Full-Width Content Container */}
        <div className="grid grid-cols-1">
          
          {/* Main Ingest Ledger Table */}
          <motion.div variants={itemVariants} className="border border-white/10 bg-[#0E0E14]/50 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="whitespace-nowrap">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">Scam Intake Registry</h3>
                <p className="text-xs text-neutral-500">Live network submissions requiring system enforcement action</p>
              </div>
              
              {/* Filter Row Controls */}
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 p-1 rounded-xl whitespace-nowrap self-start sm:self-center">
                {["ALL", "CRITICAL", "HIGH"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`px-2.5 py-1 text-[10px] font-bold font-mono tracking-wide rounded-lg transition-colors ${
                      filter === t ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse table-auto">
                <thead>
                  <tr className="border-b border-white/5 text-neutral-400 text-[11px] uppercase tracking-wider font-mono bg-white/5 whitespace-nowrap">
                    <th className="py-3.5 px-6 font-medium">Attack Vector</th>
                    <th className="py-3.5 px-4 font-medium">Target / Payload Payload</th>
                    <th className="py-3.5 px-4 font-medium">Certainty Index</th>
                    <th className="py-3.5 px-6 text-right font-medium">Matrix Measures</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-white/5 text-neutral-300 whitespace-nowrap">
                  <AnimatePresence mode="popLayout">
                    {filteredReports.map((report) => (
                      <motion.tr 
                        layout 
                        key={report.id} 
                        exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                        className="hover:bg-white/5 transition-colors group"
                      >
                        {/* Threat Type Metadata */}
                        <td className="py-4 px-6 min-w-45">
                          <div className="flex items-center gap-3">
                            <div className={`px-2 py-0.5 rounded border text-[10px] font-mono font-bold shrink-0 ${
                              report.status === "Critical" 
                                ? "bg-rose-500/10 text-rose-400 border-rose-500/20" 
                                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            }`}>
                              {report.status.toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                              <h4 className="text-xs font-bold text-neutral-200 truncate">{report.source}</h4>
                              <p className="text-[10px] text-neutral-500 font-mono">{report.id} • {report.date}</p>
                            </div>
                          </div>
                        </td>

                        {/* Target Context */}
                        <td className="py-4 px-4 font-mono text-neutral-300 min-w-60">
                          <span className="text-neutral-400 select-all font-medium tracking-tight">{report.target}</span>
                        </td>

                        {/* Confidence Index Gauge */}
                        <td className="py-4 px-4 min-w-33">
                          <div className="flex items-center gap-2.5">
                            <div className="w-12 h-1.5 bg-white/5 border border-white/5 rounded-full overflow-hidden shrink-0">
                              <div 
                                className={`h-full rounded-full ${report.status === "Critical" ? "bg-rose-500" : "bg-amber-500"}`}
                                style={{ width: report.confidence }}
                              />
                            </div>
                            <span className="font-mono text-[10px] text-neutral-400 font-bold">{report.confidence}</span>
                          </div>
                        </td>

                        {/* ROW ENFORCEMENT INTERACTIVE ACTIONS */}
                        <td className="py-4 px-6 text-right space-x-1.5 min-w-48">
                          <button
                            onClick={() => handleInspect(report.id)}
                            className="p-1.5 bg-white/5 border border-white/5 hover:border-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors inline-flex items-center justify-center vertical-middle"
                            title="Inspect Payload"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDismiss(report.id)}
                            className="p-1.5 bg-white/5 border border-white/5  hover:border-rose-500/30 rounded-lg text-neutral-400 hover:text-rose-400 transition-colors inline-flex items-center justify-center vertical-middle"
                            title="Dismiss Report"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleApproveBlock(report.id, report.target)}
                            className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500 border border-amber-500/20 hover:border-transparent text-amber-400 hover:text-black font-mono font-bold text-[10px] rounded-lg transition-all active:scale-95 inline-flex items-center justify-center vertical-middle"
                          >
                            BLOCKLIST
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  
                  {filteredReports.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-12 text-neutral-500 font-mono text-xs">
                        No pending fraud vectors matching filter constraints.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default ScamReportsDashboard;