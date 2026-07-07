"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  ShieldAlert,
  History,
  Settings,
  CircleUserRound, // পূর্বের লগের সাথে মেলাতে আইকন আপডেট করা হয়েছে
  User,
  Users,
  BarChart3,
  Menu,
  X,
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
    href: "/scan",
    icon: Search,
  },
  {
    title: "History",
    href: "/history",
    icon: History,
  },
  {
    title: "Profile",
    href: "/profile",
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
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Scam Reports",
    href: "/dashboard/reports",
    icon: ShieldAlert,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const [activeuser, setActiveuser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Mobile drawer state
  const [isMounted, setIsMounted] = useState(false); // Hydration ফিক্স করার জন্য মাউন্ট স্টেট
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const hanldeuser = async () => {
      if (user?.email) {
        const data = await getUser(user.email);
        setActiveuser(data);
      }
    };
    hanldeuser();
  }, [user?.email]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const activeMenu = activeuser?.role === "admin" ? adminMenu : userMenu;

  // Shared inner navigation content
  const SidebarContent = () => (
    <>
      {/* Premium Tech Header */}
      <div className="border-b border-zinc-900 p-6 relative flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            🛡️ <span className="tracking-tight font-extrabold">SCAMSHIELD</span>
          </h1>
          <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-1">
            // AI Threat Matrix
          </p>
        </div>
        {/* Mobile close button */}
        <button 
          onClick={() => setIsOpen(false)} 
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
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
                {/* Active Sliding Pill */}
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

      {/* Bottom Profile Layer */}
      <div className="border-t border-zinc-900 p-4 space-y-1.5 bg-zinc-950/40 backdrop-blur-md">
        
        {isMounted ? (
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
              <CircleUserRound
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
        ) : (
          <div className="flex items-center gap-3 p-2.5">
            <div className="h-9 w-9 rounded-xl bg-zinc-900 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-24 bg-zinc-900 rounded animate-pulse" />
              <div className="h-2 w-16 bg-zinc-900 rounded animate-pulse" />
            </div>
          </div>
        )}

        <motion.button
          whileHover={{ x: 4 }}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-mono text-zinc-400 hover:bg-zinc-900/40 hover:text-white transition-colors duration-200"
        >
          <Settings size={16} className="text-zinc-500" />
          <span>CONFIG_PANEL</span>
        </motion.button>
      </div>
    </>
  );

  return (
    <>
      {/* --- MOBILE TOP HEADER --- */}
      <div className="md:hidden flex h-16 items-center justify-between bg-black px-6 border-b border-zinc-900 text-white w-full sticky top-0 z-40">
        <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
          🛡️ <span className="tracking-tight font-extrabold text-sm">SCAMSHIELD</span>
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="text-zinc-400 hover:text-white transition-colors p-2"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:flex h-screen w-60 flex-col bg-black text-zinc-100 select-none sticky top-0">
        <SidebarContent />
      </aside>

      {/* --- MOBILE DRAWERS/SHEET LAYERS --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-72 bg-black text-zinc-100 flex flex-col z-50 md:hidden select-none border-r border-zinc-900 shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}