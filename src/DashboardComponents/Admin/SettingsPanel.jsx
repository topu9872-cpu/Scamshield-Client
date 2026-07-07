"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Shield, Globe, Bell, Palette, BarChart3, Lock, 
  Save, RotateCcw, CheckCircle2, ChevronRight 
} from "lucide-react";
import { toast } from "sonner";

const tabs = [
  { id: "profile", label: "Profile", icon: <User size={16} /> },
  { id: "security", label: "Security", icon: <Shield size={16} /> },
  { id: "general", label: "General", icon: <Globe size={16} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
  { id: "appearance", label: "Appearance", icon: <Palette size={16} /> },
  { id: "platform", label: "Platform", icon: <BarChart3 size={16} /> },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleSave = () => {
    toast.success("Settings saved successfully", {
      description: "Your platform configuration has been updated.",
      icon: <CheckCircle2 className="text-emerald-500" />
    });
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-neutral-200 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-white">Platform Settings</h1>
          <p className="text-neutral-500 text-sm mt-1">Manage your scam report platform configuration.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-8">
          {/* Sidebar Navigation */}
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
                  activeTab === tab.id 
                    ? "bg-white/5 text-white border border-white/10" 
                    : "text-neutral-500 hover:bg-white/5 hover:text-neutral-300"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Settings Content */}
          <main className="bg-[#0b0b10] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabContent activeTab={activeTab} />
              </motion.div>
            </AnimatePresence>

            {/* Sticky Actions */}
            <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-white/10">
              <button className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors">
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-neutral-200 transition-all flex items-center gap-2"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function TabContent({ activeTab }) {
  // Mock UI for the Profile Tab
  if (activeTab === "profile") {
    return (
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-white mb-4">Profile Settings</h2>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-neutral-800 border-2 border-white/10" />
          <button className="text-sm border border-white/10 px-4 py-2 rounded-lg hover:bg-white/5">Change Photo</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Full Name" placeholder="Topu Admin" />
          <InputField label="Email Address" placeholder="admin@scamreport.io" />
        </div>
      </div>
    );
  }

  // Mock UI for Appearance Tab
  if (activeTab === "appearance") {
    return (
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-white mb-4">Appearance</h2>
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
          <div>
            <p className="text-sm font-bold">Dark Mode</p>
            <p className="text-xs text-neutral-500">System wide aesthetic</p>
          </div>
          <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
            <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64 flex flex-col items-center justify-center text-neutral-600">
      <Lock size={32} className="mb-2 opacity-20" />
      <p className="text-sm">Content for {activeTab} loading...</p>
    </div>
  );
}

function InputField({ label, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-bold text-neutral-400 mb-2">{label}</label>
      <input 
        className="w-full bg-[#07070a] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-white/30 outline-none" 
        placeholder={placeholder} 
      />
    </div>
  );
}