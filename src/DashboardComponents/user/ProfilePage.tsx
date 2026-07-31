"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, ShieldCheck, Lock, Bell } from "lucide-react";
import { LazyLoader } from "@/Ui/LazyLoder";
import { authClient } from "@/lib/auth-Client";
import Image from "next/image";

const EditProfileModal = LazyLoader(() => import("./EditProfileModal"));

export default function UserProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Handle loading state to prevent crashes when user is undefined
  if (isPending) {
    return (
      <div className="min-h-screen bg-[#07070a] text-neutral-200 flex items-center justify-center">
        <div className="animate-pulse text-neutral-500">Loading profile...</div>
      </div>
    );
  }

  // Handle unauthenticated state safely
  if (!user) {
    return (
      <div className="min-h-screen bg-[#07070a] text-neutral-200 flex items-center justify-center">
        <div className="text-neutral-400">Please sign in to view your profile.</div>
      </div>
    );
  }

  // Safely parse the creation date
  const joinedYear = user?.createdAt ? new Date(user.createdAt).getFullYear() : null;

  return (
    <div className="min-h-screen bg-[#07070a] text-neutral-200 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-[#0b0b10] border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl backdrop-blur-xl">
          <div className="relative">
            {user?.image ? (
              <Image
                src={user.image}
                width={150}
                height={150}
                alt={user.name || "Profile image"}
                className="rounded-full border-4 border-[#0b0b10] object-cover w-38 h-38"
              />
            ) : (
              <div className="w-38 h-38 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                {user?.name?.[0] || "U"}
              </div>
            )}
            <div className="absolute bottom-0 right-0 p-2 bg-emerald-500 rounded-full border-4 border-[#0b0b10]">
              <ShieldCheck size={16} className="text-white" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
            <p className="text-neutral-500">{user?.username || "@username"}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm text-neutral-400">
              <span className="flex items-center gap-1">
                <Mail size={14} /> {user?.email}
              </span>
              {joinedYear && (
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> Joined {joinedYear}
                </span>
              )}
            </div>
          </div>
          <EditProfileModal/>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Info Column */}
          <div className="md:col-span-2 space-y-8">
            <ProfileCard title="About Me" icon={<User size={18} />}>
              {user?.bio ? (
                <p className="text-neutral-400 leading-relaxed">{user.bio}</p>
              ) : (
                <p className="text-neutral-500 leading-relaxed">Add your bio</p>
              )}
            </ProfileCard>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            <div className="bg-[#0b0b10] border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <Lock size={18} /> Security
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-left">
                  <span className="text-sm">Change Password</span>
                  <Lock size={14} className="text-neutral-500" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-left">
                  <span className="text-sm">Notifications</span>
                  <Bell size={14} className="text-neutral-500" />
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