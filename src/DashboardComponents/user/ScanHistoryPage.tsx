"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { DeleteProjectDialog } from "./BestUIAlertDialog";

export default function ScanHistoryPage({ scanHistory }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Handle data mapping (checking if scanHistory is an array or wrapped in an object)
  const historyArray = Array.isArray(scanHistory) 
    ? scanHistory 
    : scanHistory?.history || [];

  // --- DERIVE RISK LEVEL DYNAMICALLY ---
  const getRiskLevel = (item) => {
    if (item.isScam) return "Scam Detected";
    if (item.score > 50) return "Suspicious";
    return "Safe";
  };

  // --- FORMAT DATE HELPER ---
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // --- FILTERING LOGIC ---
  const filteredData = historyArray.filter((item) => {
    const matchesSearch = item.value?.toLowerCase().includes(search.toLowerCase());
    const riskLevel = getRiskLevel(item);
    const matchesCategory = activeFilter === "All" || riskLevel === activeFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#07070a] text-neutral-200 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 bg-[#0b0b10] p-4 rounded-xl border border-white/10">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 text-neutral-600" size={16} />
            <input 
              placeholder="Search history..." 
              className="w-full bg-[#07070a] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:border-white/30 outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <select 
            className="bg-[#07070a] border border-white/10 rounded-lg px-4 py-2 text-sm outline-none cursor-pointer"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Safe">Safe</option>
            <option value="Suspicious">Suspicious</option>
            <option value="Scam Detected">Scam Detected</option>
          </select>
        </div>

        {/* Table Rendering */}
        <div className="bg-[#0b0b10] border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-neutral-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Value</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Risk Level</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => {
                    const risk = getRiskLevel(item);
                    const rowKey = item._id || item.id || index;

                    return (
                      <motion.tr 
                        key={rowKey} 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4 font-mono text-xs uppercase">{item.type}</td>
                        <td className="px-6 py-4 truncate max-w-50">{item.value}</td>
                        <td className="px-6 py-4 text-neutral-400 text-xs">{formatDate(item.createdAt)}</td>
                        <td className="px-6 py-4 font-mono text-xs">
                          <span className={`px-2 py-0.5 rounded font-bold ${
                            (item.score ?? 0) > 70 ? "text-red-400 bg-red-500/10" :
                            (item.score ?? 0) > 40 ? "text-yellow-400 bg-yellow-500/10" :
                            "text-emerald-400 bg-emerald-500/10"
                          }`}>
                            {item.score ?? 0}/100
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            risk === "Safe" ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/10" :
                            risk === "Suspicious" ? "border-yellow-500/20 text-yellow-500 bg-yellow-500/10" :
                            "border-red-500/20 text-red-500 bg-red-500/10"
                          }`}>{risk}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DeleteProjectDialog item={item}/>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-neutral-500 text-sm">
                      No results found for your filter.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}