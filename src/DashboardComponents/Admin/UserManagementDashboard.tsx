"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  Clock, 
  CheckCircle, 
  Users, 
  ArrowUpRight, 
  Command,
  Activity,
  UserX,
  UserCheck,
  ShieldCheck,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

// --- INITIAL DATA ARCHITECTURE ---
const initialUsers = [
  { id: "USR-091", name: "Alex Mercer", email: "a.mercer@sec.io", role: "Enforcer", avatar: "AM", status: "Active", risk: "Low" },
  { id: "USR-092", name: "Sarah Connor", email: "s.connor@cyber.net", role: "Moderator", avatar: "SC", status: "Active", risk: "Low" },
  { id: "USR-093", name: "Vikram Singh", email: "v.singh@alpha.dev", role: "user", avatar: "VS", status: "Active", risk: "Minimal" },
  { id: "USR-094", name: "Unknown Node", email: "node_77x@proxy.tor", role: "Enforcer", avatar: "??", status: "Suspicious", risk: "High" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 16 } },
};

const UserManagementDashboard = () => {
  const [users, setUsers] = useState(initialUsers);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    toast("Identity Control Engine Online", {
      description: "Administrative isolation matrix synchronized.",
      icon: <Command className="w-4 h-4 text-purple-400" />,
    });
  }, []);

  // --- INTERACTION HANDLERS ---
  const handleToggleBlock = (userId, currentStatus, userName) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          const nextStatus = currentStatus === "Blocked" ? "Active" : "Blocked";
          const nextRisk = nextStatus === "Blocked" ? "Isolated" : "Low";
          return { ...user, status: nextStatus, risk: nextRisk };
        }
        return user;
      })
    );

    if (currentStatus === "Blocked") {
      toast.success(`Access Restored`, {
        description: `${userName} has been unblocked and re-authorized.`,
        icon: <UserCheck className="w-4 h-4 text-emerald-400" />
      });
    } else {
      toast.error(`Session Terminated`, {
        description: `${userName} has been blacklisted and isolated.`,
        icon: <UserX className="w-4 h-4 text-rose-400" />
      });
    }
  };

  const handleBulkAction = (actionType) => {
    if (actionType === "block-all") {
      setUsers(prev => prev.map(u => ({ ...u, status: "Blocked", risk: "Isolated" })));
      toast.warning("Global Lock Down Activated", { description: "All non-admin user nodes have been blacklisted." });
    } else if (actionType === "reset") {
      setUsers(initialUsers);
      toast.info("Identity Ledger Reset", { description: "System nodes reverted to initial baseline configurations." });
    }
  };

  // --- DYNAMIC INFRASTRUCTURE METRICS ---
  const totalReports = 3842;
  const pendingReports = users.filter(u => u.status === "Suspicious").length * 14 + 128;
  const blockedCount = users.filter(u => u.status === "Blocked").length;
  const activeCount = users.filter(u => u.status === "Active").length;

  if (!mounted) return <div className="min-h-screen bg-[#050508]" />;

  return (
    <div className="min-h-screen bg-[#050508] text-gray-100 p-4 md:p-8 font-sans relative overflow-hidden antialiased selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Background Lens Gradients */}
      <div className="absolute top-0 left-1/4 w-125 h-75 bg-linear-to-br from-purple-600/10 to-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-125 h-100 bg-linear-to-tr from-rose-600/5 to-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-8 relative z-10"
      >
        {/* Header Infrastructure */}
        <motion.header variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-400">
              <ShieldAlert className="w-3.5 h-3.5" /> Security Access Framework
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-linear-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Identity Governance Matrix
            </h1>
            <p className="text-xs md:text-sm text-neutral-400">
              Administrative override portal to monitor, block, and re-authorize active user sessions.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-center">
            <button 
              onClick={() => handleBulkAction("reset")}
              className="p-2 bg-white/5 border border-white/10 rounded-xl text-neutral-400 hover:text-white transition-colors"
              title="Reset Ledger Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5 text-xs bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-xl text-neutral-300 shadow-xl shadow-black/40">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-mono text-neutral-400">v4.15-Enforcer</span>
            </div>
          </div>
        </motion.header>

        {/* --- Dynamic Overview Telemetry Metrics --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Total Reports Tracking", count: totalReports, subtitle: "Aggregated threat events", icon: <ShieldAlert className="text-purple-400" />, glow: "hover:border-purple-500/20" },
            { title: "Pending Ingestions", count: pendingReports, subtitle: "Awaiting active triage", icon: <Clock className="text-blue-400" />, glow: "hover:border-blue-500/20" },
            { title: "Active Authorizations", count: activeCount, subtitle: "Passing zero-trust checks", icon: <CheckCircle className="text-emerald-400" />, glow: "hover:border-emerald-500/20" },
            { title: "Isolated User Nodes", count: blockedCount, subtitle: "Administratively Blacklisted", icon: <UserX className="text-rose-400" />, glow: "hover:border-rose-500/20" }
          ].map((card) => (
            <motion.div key={card.title} variants={itemVariants} className="group" whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
              <div className={`border border-white/10 bg-[#0A0A0F]/40 backdrop-blur-3xl p-5 md:p-6 rounded-2xl relative shadow-xl flex justify-between items-start transition-colors duration-300 ${card.glow} overflow-hidden`}>
                <div className="space-y-2.5 relative z-10">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block font-mono">{card.title}</span>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white font-mono">
                    {card.count}
                  </h2>
                  <span className="text-[11px] text-neutral-500 block font-medium">{card.subtitle}</span>
                </div>
                <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl group-hover:scale-105 transition-all duration-300 shadow-md">
                  {card.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Main Governance Panel Layer --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Controls Ledger Table */}
          <motion.div variants={itemVariants} className="lg:col-span-2 border border-white/10 bg-[#0A0A0F]/50 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-2xl hover:border-white/20 transition-colors">
            <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">Identity Control Ledger</h3>
                <p className="text-xs text-neutral-500">Live operational nodes with active firewall action handles</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-neutral-500">Node Status:</span>
                <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">Active</span>
                <span className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">Blocked</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-neutral-400 text-[11px] uppercase tracking-wider font-mono bg-white/5">
                    <th className="py-3.5 px-6 font-medium">Identity Frame</th>
                    <th className="py-3.5 px-4 font-medium">Email</th>
                    <th className="py-3.5 px-4 font-medium">Network Firewall Status</th>
                    <th className="py-3.5 px-6 text-right font-medium">Override Execution</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-white/5 text-neutral-300">
                  <AnimatePresence mode="popLayout">
                    {users.map((user) => (
                      <motion.tr 
                        layout 
                        key={user.id} 
                        className={`transition-colors group ${user.status === "Blocked" ? "bg-rose-950/10 text-neutral-400" : "hover:bg-white/5"}`}
                      >
                        {/* User Profile Cell */}
                        <td className="py-4 px-6 font-medium text-neutral-200">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center text-[10px] font-black font-mono shadow-inner ${
                              user.status === "Blocked" 
                                ? "bg-rose-950/40 border-rose-500/30 text-rose-400 animate-pulse" 
                                : "bg-linear-to-b from-neutral-800 to-neutral-950 border-white/10 text-white"
                            }`}>
                              {user.avatar}
                            </div>
                            <div className="truncate max-w-45">
                              <h4 className={`text-xs font-bold truncate ${user.status === "Blocked" ? "text-neutral-500 line-through" : "text-neutral-200"}`}>{user.name}</h4>
                              <p className="text-[10px] text-neutral-500 font-mono truncate">{user.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Role Cell */}
                        <td className="py-4 px-4 text-neutral-400 font-mono font-semibold">
                          <span className="px-2 py-0.5 bg-neutral-900 border border-white/5 rounded text-neutral-400">
                            {user.email}
                          </span>
                        </td>

                        {/* Status Check Badge Cell */}
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono tracking-wide border ${
                            user.status === "Blocked" 
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20" 
                              : user.status === "Suspicious"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          }`}>
                            {user.status}
                          </span>
                        </td>

                        INTERACTIVE TOGGLE BUTTON OVERRIDE
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleToggleBlock(user.id, user.status, user.name)}
                            disabled={user.role === "Admin" && user.status !== "Blocked"} // Safety check preventing accidental lockout
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold font-mono text-[10px] transition-all relative overflow-hidden active:scale-[0.97] ${
                              user.role === "Admin" && user.status !== "Blocked"
                                ? "opacity-30 cursor-not-allowed bg-neutral-900 text-neutral-600 border border-transparent"
                                : user.status === "Blocked"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20"
                            }`}
                          >
                            {user.status === "Blocked" ? (
                              <>
                                <UserCheck className="w-3 h-3" /> UNBLOCK NODE
                              </>
                            ) : (
                              <>
                                <UserX className="w-3 h-3" /> BLOCK NODE
                              </>
                            )}
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Right-hand Administrative Actions Panel */}
          <div className="space-y-6 flex flex-col justify-between">
            
            {/* Global Infrastructure Rules */}
            <motion.div variants={itemVariants} className="border border-white/10 bg-[#0A0A0F]/50 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl hover:border-white/20 transition-colors flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2">Global System Rules</h3>
                <p className="text-xs text-neutral-500 mb-4">Enforce systemic constraints across all integrated network identity nodes.</p>
                
                <div className="space-y-4 border-t border-white/5 pt-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-neutral-200 block">Enforce Multi-Factor Access</span>
                      <span className="text-[10px] text-neutral-500 block">Require token ring updates every 15 min</span>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 opacity-60">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-neutral-400 block">Automatic Proximal Blocking</span>
                      <span className="text-[10px] text-neutral-600 block">Isolate users instantly if threat risk triggers High</span>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <button 
                  onClick={() => handleBulkAction("block-all")}
                  className="w-full py-2.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20 text-xs font-mono font-bold tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group active:scale-[0.99]"
                >
                  <ShieldCheck className="w-4 h-4" /> EMERGENCY REACCESS OVERRIDE
                </button>
              </div>
            </motion.div>

            {/* Quick Access Actions Links */}
            <motion.div variants={itemVariants} className="border border-white/10 bg-[#0A0A0F]/50 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl hover:border-white/20 transition-colors">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-3.5">Administrative Desks</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { label: "View Firewall Intrusion Logs", onClick: () => toast.info("Opening system architecture packet logs...") },
                  { label: "Audit Level-3 Token Changes", onClick: () => toast.warning("Audit engine requires secondary authorization sign-off.") }
                ].map((action) => (
                  <button key={action.label} onClick={action.onClick} className="flex items-center gap-3 w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-left text-xs font-semibold text-neutral-300 hover:text-white transition-all group relative overflow-hidden active:scale-[0.99]">
                    <span className="flex-1 relative z-10">{action.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
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

export default UserManagementDashboard;