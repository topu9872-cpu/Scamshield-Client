"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  ShieldAlert,
  History,
  Settings,
  UserCircle2,
  LogOut,
  User,
  Users,
  BarChart3,
} from "lucide-react";
import { authClient } from "@/lib/auth-Client";
import { useEffect, useState } from "react";
import { getUser } from "@/app/api/serverAction";

export const userMenu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Scan",
    href: "/dashboard/scan",
    icon: Search,
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: History,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

export const adminMenu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "Scam Reports",
    href: "/dashboard/admin/reports",
    icon: ShieldAlert,
  },
  {
    title: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const [activeuser, setActiveuser] = useState(null);
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  useEffect(() => {
    const hanldeuser = async () => {
      const data = await getUser(user?.email);
      setActiveuser(data);
    };
    hanldeuser();
  }, [user?.email]);
  const activeMenu =activeuser?.role === "admin" ? adminMenu : userMenu;
  return (
    <aside className="hidden md:flex h-screen w-72 flex-col border-r border-zinc-900 bg-black text-zinc-100 select-none">
      {/* Premium Tech Header */}
      <div className="border-b border-zinc-900 p-6 relative">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          🛡️ <span className="tracking-tight font-extrabold">SCAMSHIELD</span>
        </h1>
        <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-1">
          // AI Threat Matrix
        </p>
      </div>

      {/* Navigation Layer */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {activeMenu.map(({ title, href, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link key={title} href={href} className="relative block group">
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 380, damping: 25 }}
                className={`relative flex items-center gap-3 rounded-xl px-4 py-3 z-10 transition-colors duration-300 ${
                  active
                    ? "text-black font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {/* Clean Ultra-High Contrast Sliding Pill */}
                {active && (
                  <motion.div
                    layoutId="activeMenuPill"
                    className="absolute inset-0 bg-white rounded-xl -z-10 shadow-lg shadow-white/5"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <Icon
                  size={18}
                  className={
                    active
                      ? "text-black"
                      : "text-zinc-400 group-hover:text-zinc-200 transition-colors"
                  }
                />
                <span className="text-sm">{title}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile and Controls Layer */}
      <div className="border-t border-zinc-900 p-4 space-y-1.5 bg-zinc-950/40 backdrop-blur-md">
        {/* Dynamic User Profile Card */}
        <div className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-zinc-900/50 cursor-pointer transition-all duration-200 group border border-transparent hover:border-zinc-900">
          {user?.image ? (
            <div className="relative h-9 w-9 rounded-xl overflow-hidden border border-zinc-800">
              <Image
                src={user.image}
                alt={user.name || "User Avatar"}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <UserCircle2
              size={36}
              className="text-zinc-500 group-hover:text-zinc-300 transition-colors"
            />
          )}
          <div className="truncate flex-1">
            <p className="font-medium text-sm text-zinc-200 group-hover:text-white truncate">
              {user?.name || "Anonymous User"}
            </p>
            <p className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase truncate">
              {user?.role === "admin" ? "🛡️ System Admin" : "Verified Node"}
            </p>
          </div>
        </div>

        {/* System Utility Actions */}
        <motion.button
          whileHover={{ x: 4 }}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-mono text-zinc-400 hover:bg-zinc-900/40 hover:text-white transition-colors duration-200"
        >
          <Settings size={16} className="text-zinc-500" />
          <span>CONFIG_PANEL</span>
        </motion.button>
      </div>
    </aside>
  );
}
