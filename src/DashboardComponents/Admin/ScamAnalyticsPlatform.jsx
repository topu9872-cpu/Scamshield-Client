"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Zap, Send } from "lucide-react";

const chartData = [
  { month: "Jan", streamA: 186, streamB: 80 },
  { month: "Feb", streamA: 305, streamB: 200 },
  { month: "Mar", streamA: 237, streamB: 120 },
  { month: "Apr", streamA: 73, streamB: 190 },
  { month: "May", streamA: 209, streamB: 130 },
  { month: "Jun", streamA: 214, streamB: 140 },
];

const AreaAnalyticsWorkspace = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Area Chart stream initialized." },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: input },
    ]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "bot", text: `Analyzing trend: ${input}` },
      ]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* --- CHART SECTION --- */}
        <div className="lg:col-span-8 bg-[#0b0b10] border border-white/5 rounded-2xl p-6">
          <h2 className="text-xs font-bold uppercase mb-6 text-neutral-400">
            Multi-Stream Area Variance
          </h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#666" fontSize={10} />
                <YAxis stroke="#666" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#000",
                    border: "1px solid #333",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="streamA"
                  stroke="#2dc653"
                  fill="#c2f8cb"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="streamB"
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#colorB)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- CHAT CONSOLE --- */}
        <div className="lg:col-span-4 bg-[#0b0b10] border border-white/5 rounded-2xl flex flex-col h-100">
          <div className="p-4 border-b border-white/5 flex items-center gap-2">
            <Zap size={14} className="text-yellow-500" />{" "}
            <span className="text-[10px] font-bold">LIVE CONSOLE</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${m.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-6 h-6 rounded bg-neutral-900 flex items-center justify-center">
                    {m.sender === "bot" ? (
                      <Bot size={12} />
                    ) : (
                      <User size={12} />
                    )}
                  </div>
                  <p className="text-[11px] bg-white/5 p-2 rounded max-w-[80%]">
                    {m.text}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          {/* CHAT INPUT FIELD */}
          <form
            onSubmit={handleSend}
            className="p-4 border-t border-white/5 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-neutral-950 text-[11px] p-2 rounded border border-white/10 outline-none focus:border-white transition-colors"
              placeholder="Query analysis..."
            />
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded transition-colors">
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AreaAnalyticsWorkspace;
