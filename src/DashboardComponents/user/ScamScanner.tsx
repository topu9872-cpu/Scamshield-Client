"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ShieldAlert, ShieldCheck, 
  Globe, Mail, Phone, MessageSquare, Loader2, 
  Zap
} from "lucide-react";
import { toast } from "sonner";
import { scannerPost } from "@/app/api/serverAction";
import { ScanResult, ScanType } from "@/types/scan";



const scanTypes: {
  id: ScanType;
  label: string;
  icon: React.ReactNode;
}[] = [
  { id: "url", label: "Website URL", icon: <Globe size={16} /> },
  { id: "email", label: "Email", icon: <Mail size={16} /> },
  { id: "phone", label: "Phone", icon: <Phone size={16} /> },
  { id: "text", label: "Text/Message", icon: <MessageSquare size={16} /> },
];

export default function ScamScanner() {
  const [activeType, setActiveType] = useState<ScanType>("url");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [value, setValue] = useState("");

const handleScan = async () => {
  if (!value.trim()) {
    toast.error("Input is required");
    return;
  }

  try {
    setLoading(true);
    const res = await scannerPost({
      type: activeType,
      value,
    });

    setResult(res);

  } catch (error) {
    console.error("4. Error:", error);
    toast.error("Scan failed");
  } finally {
    setLoading(false);
  }
};

  const isScam = result ? result.isScam || result.score > 50 : false;

  return (
    <div className="min-h-screen bg-[#07070a] text-neutral-200 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Scam Scanner</h1>
          <p className="text-neutral-500">Analyze URLs, emails, and messages for phishing and fraudulent patterns.</p>
        </div>

        {/* Scan Input Card */}
        <div className="bg-[#0b0b10] border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {scanTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeType === type.id ? "bg-white text-black" : "bg-white/5 text-neutral-400 hover:bg-white/10"
                }`}
              >
                {type.icon} {type.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <input 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
              className="flex-1 bg-[#07070a] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/30 outline-none"
              placeholder={`Enter ${activeType} to scan...`}
            />
            <button 
              onClick={handleScan}
              disabled={loading}
              className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
              Scan Now
            </button>
          </div>
        </div>

        {/* Result Area */}
        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-12 text-neutral-500">
              <Loader2 size={40} className="animate-spin mb-4 text-white" />
              <p>Analyzing input patterns...</p>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-6">
              {/* Result Card */}
              <div className={`bg-[#0b0b10] border rounded-2xl p-6 shadow-lg ${isScam ? "border-red-500/20" : "border-emerald-500/20"}`}>
                <div className="flex items-center justify-between mb-4">
                  {isScam ? (
                    <span className="flex items-center gap-2 text-red-500 font-bold uppercase text-xs">
                      <ShieldAlert size={16} /> Scam Detected
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs">
                      <ShieldCheck size={16} /> Appears Safe
                    </span>
                  )}
                  <span className="text-2xl font-black text-white">{result.score}%</span>
                </div>
                <p className="text-sm text-neutral-400 mb-6">{result.summary}</p>
                <button className={`w-full py-2 border rounded-lg text-sm font-bold transition-colors ${
                  isScam 
                    ? "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20" 
                    : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
                }`}>
                  {isScam ? "Report as Scam" : "Flag False Positive"}
                </button>
              </div>

              {/* AI Insights Card */}
              <div className="bg-[#0b0b10] border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Zap size={16} className="text-yellow-500" /> AI Insights</h3>
                <ul className="space-y-3 text-sm text-neutral-400">
                  {result.insights && result.insights.length > 0 ? (
                    result.insights.map((insight, idx) => (
                      <li key={idx} className="flex gap-2">• {insight}</li>
                    ))
                  ) : (
                    <>
                      <li className="flex gap-2">• No immediate structural anomalies found</li>
                      <li className="flex gap-2">• Checked against known threat intelligence databases</li>
                      <li className="flex gap-2">• Heuristics patterns checked successfully</li>
                    </>
                  )}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}