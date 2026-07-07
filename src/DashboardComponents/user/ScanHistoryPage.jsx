"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trash2, Eye, Filter, ChevronDown, Trash, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { DeleteProjectDialog } from "./BestUIAlertDialog";


const initialHistory = [
  { id: 1, type: "URL", value: "crypto-reward-giveaway.com", risk: "Scam Detected", date: "2026-07-08" },
  { id: 2, type: "Email", value: "support@bank-secure-update.net", risk: "Suspicious", date: "2026-07-07" },
  { id: 3, type: "Phone", value: "+1-800-555-0199", risk: "Safe", date: "2026-07-06" },
  { id: 4, type: "Text", value: "You have won a lottery, click here...", risk: "Scam Detected", date: "2026-07-05" },
];

export default function ScanHistoryPage() {
  const [history] = useState(initialHistory);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // --- FILTERING LOGIC ---
  const filteredData = history.filter((item) => {
    const matchesSearch = item.value.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeFilter === "All" || item.risk === activeFilter;
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
          
          {/* Functional Filter Dropdown */}
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
                <th className="px-6 py-4">Risk Level</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <motion.tr 
                      key={item.id} 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-xs">{item.type}</td>
                      <td className="px-6 py-4 truncate max-w-50">{item.value}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          item.risk === "Safe" ? "border-emerald-500/20 text-emerald-500" :
                          item.risk === "Suspicious" ? "border-yellow-500/20 text-yellow-500" :
                          "border-red-500/20 text-red-500"
                        }`}>{item.risk}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DeleteProjectDialog/>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-10 text-center text-neutral-500 text-sm">
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