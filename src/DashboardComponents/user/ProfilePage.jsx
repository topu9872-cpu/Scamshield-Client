"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, Mail, Phone, MapPin, Calendar, ShieldCheck, 
  Settings, History, Save, Edit2, Lock, Bell, LogOut 
} from "lucide-react";
import { toast } from "sonner";
import EditProfileModal from "./EditProfileModal";



const mockUser = {
  name: "Topu Admin",
  username: "@topu_dev",
  email: "topu@scamreport.io",
  joined: "January 2026",
  bio: "Cybersecurity enthusiast and full-stack developer. Passionate about creating safer digital spaces.",
  stats: { submitted: 42, verified: 38, pending: 4, saved: 12 }
};

export default function UserProfilePage() {
  const handleUpdate = () => {
    toast.success("Profile updated successfully");
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-neutral-200 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-[#0b0b10] border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl backdrop-blur-xl">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
              TA
            </div>
            <div className="absolute bottom-0 right-0 p-2 bg-emerald-500 rounded-full border-4 border-[#0b0b10]">
              <ShieldCheck size={16} className="text-white" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white">{mockUser.name}</h1>
            <p className="text-neutral-500">{mockUser.username}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm text-neutral-400">
              <span className="flex items-center gap-1"><Mail size={14}/> {mockUser.email}</span>
              <span className="flex items-center gap-1"><Calendar size={14}/> Joined {mockUser.joined}</span>
            </div>
          </div>

            <EditProfileModal/>
           
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Info Column */}
          <div className="md:col-span-2 space-y-8">
            <ProfileCard title="About Me" icon={<User size={18}/>}>
              <p className="text-neutral-400 leading-relaxed">{mockUser.bio}</p>
            </ProfileCard>

            <ProfileCard title="Account Statistics" icon={<History size={18}/>}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(mockUser.stats).map(([key, val]) => (
                  <div key={key} className="bg-[#07070a] p-4 rounded-xl border border-white/5 text-center">
                    <p className="text-2xl font-black text-white">{val}</p>
                    <p className="text-[10px] uppercase text-neutral-500 tracking-wider font-bold">{key}</p>
                  </div>
                ))}
              </div>
            </ProfileCard>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            <div className="bg-[#0b0b10] border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-6 flex items-center gap-2"><Lock size={18}/> Security</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <span className="text-sm">Change Password</span>
                  <Lock size={14} className="text-neutral-500"/>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <span className="text-sm">Notifications</span>
                  <Bell size={14} className="text-neutral-500"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileCard({ title, icon, children }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0b0b10] border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-6 font-bold text-white">
        {icon} {title}
      </div>
      {children}
    </motion.div>
  );
}