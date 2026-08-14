"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Search,
  Lock,
  Mail,
  Phone,
  Globe,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Check,
  MessageSquare,
  Smartphone,
  Laptop,
  HelpCircle,
  Shield,
  Key,
  CreditCard,
  FileText,
  UserCheck,
} from "lucide-react";

export default function LearnPageBlackTheme() {
  // Common Scams Category State
  const [activeScamCategory, setActiveScamCategory] = useState(0);

  // Spot the Red Flags Hover State
  const [hoveredFlag, setHoveredFlag] = useState<string | null>(null);

  // Mini Training Quiz State
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean | null>(null);
  const [userChoice, setUserChoice] = useState<"safe" | "suspicious" | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scamCategories = [
    {
      title: "Phishing",
      example: '"Your streaming account has been suspended. Click the link below to update your payment details immediately."',
      whatTheyWant: ["Passwords & Login Credentials", "Credit Card Information"],
      warningSigns: [
        "Creates false urgency or panic",
        "Uses a vague or slightly altered web link",
        "Generic greeting instead of your name",
      ],
      action: "Never click links in unexpected alert messages. Log in directly through your official app or bookmarked website.",
    },
    {
      title: "Fake Websites",
      example: "A web page that looks identical to your online banking portal, but the URL in the address bar is misspelled.",
      whatTheyWant: ["Account Passwords", "Two-Factor Authentication Codes"],
      warningSigns: [
        "Slightly misspelled domain name",
        "Missing secure padlock icon or odd SSL certificates",
        "Asks for sensitive information out of nowhere",
      ],
      action: "Always verify the address bar before entering passwords or personal information.",
    },
    {
      title: "Delivery Scams",
      example: '"Your package is waiting for delivery confirmation. Pay $2.99 customs fee to reschedule."',
      whatTheyWant: ["Credit Card Details", "Personal Home Address"],
      warningSigns: [
        "Unexpected notification about a package you didn't order",
        "Requests a small fee to release delivery",
        "Links to an unfamiliar tracking portal",
      ],
      action: "Check your recent online orders directly on official retailer apps or shipping courier websites.",
    },
    {
      title: "Account Takeover",
      example: '"We noticed a sign-in attempt from an unrecognized device. Secure your account now."',
      whatTheyWant: ["Full Account Access", "Personal Recovery Codes"],
      warningSigns: [
        "Unsolicited security alerts out of the blue",
        "High pressure to act within minutes",
        "Links leading away from the official domain",
      ],
      action: "Open your device settings or official app independently to inspect active security sessions.",
    },
    {
      title: "Investment Scams",
      example: '"Guaranteed 300% weekly returns on cryptocurrency portfolios with zero risk."',
      whatTheyWant: ["Money & Wire Transfers", "Cryptocurrency Asset Deposits"],
      warningSigns: [
        "Promises guaranteed high returns with zero risk",
        "Pushes for immediate cash or crypto deposits",
        "Uses high-pressure sales tactics",
      ],
      action: "Remember that legitimate investments always carry risk; guaranteed high returns are a hallmark of fraud.",
    },
    {
      title: "Job Scams",
      example: '"Work from home as a data entry specialist. Earn $50/hour. Buy your own equipment upfront."',
      whatTheyWant: ["Personal Identity Documents", "Upfront Equipment Payment"],
      warningSigns: [
        "Unrealistically high pay for minimal entry requirements",
        "Requires you to purchase equipment using your own money",
        "Communication via encrypted messaging apps only",
      ],
      action: "Research the hiring company thoroughly and never pay out-of-pocket for mandatory employment gear.",
    },
    {
      title: "Romance Scams",
      example: '"I want to visit you so badly, but my bank account is frozen and I need money for plane tickets."',
      whatTheyWant: ["Money Transfers & Gift Cards", "Sympathy-driven Financial Support"],
      warningSigns: [
        "Builds emotional attachment very quickly",
        "Always invents emergencies preventing in-person meetings",
        "Asks for financial assistance without ever meeting face-to-face",
      ],
      action: "Never send money or financial support to anyone you have only met online.",
    },
    {
      title: "Phone Scams",
      example: '"This is your local utility company. Your power will be disconnected in 1 hour unless you pay immediately via gift card."',
      whatTheyWant: ["Immediate Money Payments", "Sensitive Personal Data"],
      warningSigns: [
        "Threatens immediate service shutoff or legal arrest",
        "Demands payment via untraceable methods (gift cards, crypto, wire)",
        "Aggressive and refuses to let you hang up",
      ],
      action: "Hang up immediately and call the official published customer support phone number on your utility bill.",
    },
  ];

  const flagExplanations: Record<string, { title: string; desc: string }> = {
    URGENT: {
      title: "Artificial Urgency",
      desc: "Scammers create false deadlines to make you panic and act without thinking.",
    },
    "closed today": {
      title: "Threat of Loss",
      desc: "Using fear of losing an important service forces compliance.",
    },
    "within 30 minutes": {
      title: "Strict Time Pressure",
      desc: "Pressures you not to take time to verify the story with a friend or colleague.",
    },
    "Verify Now": {
      title: "Unsafe Call to Action",
      desc: "Leads you straight to a fake credential-harvesting login page.",
    },
    "bank account": {
      title: "High-Stakes Hook",
      desc: "Targets critical services like banking to instantly grab your full attention.",
    },
  };

  const quizzes = [
    {
      id: 1,
      type: "SMS Text",
      sender: "Courier Service",
      content: "Your package could not be delivered because of an incorrect street address. Update your delivery details here: http://track-parcel-update.net/shipping",
      isScam: true,
      warningSigns: [
        "Suspicious web link that doesn't match the courier's official domain",
        "Unsolicited tracking notification when you aren't expecting a package",
        "Creates slight anxiety about a delayed delivery",
      ],
    },
    {
      id: 2,
      type: "Email Notification",
      sender: "Streaming Service Billing",
      content: "Your monthly subscription payment failed. To avoid service interruption, please update your billing card on file.",
      isScam: true,
      warningSigns: [
        "Generic greeting ('Dear Customer') instead of your name",
        "Vague link leading away from the official billing portal",
        "Creates urgency around service interruption",
      ],
    },
    {
      id: 3,
      type: "In-App Notification",
      sender: "Online Bank Security",
      content: "We noticed a routine password update prompt. You can review your security settings anytime inside your official banking mobile app.",
      isScam: false,
      warningSigns: [
        "No external links or urgent threats included",
        "Directs you safely to check your account inside the official app",
        "Calm, informative, and non-coercive tone",
      ],
    },
  ];

  const faqs = [
    {
      q: "How do I know if a message is a scam?",
      a: "Look for artificial urgency, threats of negative consequences, requests for sensitive data, and mismatched or unfamiliar web links.",
    },
    {
      q: "Can a legitimate company send suspicious-looking messages?",
      a: "Sometimes poorly formatted emails come from real companies, but you should never click links inside them. Always navigate to the official website or app yourself.",
    },
    {
      q: "What should I do if I clicked a suspicious link?",
      a: "Disconnect your device from the internet, change important passwords immediately from a secure device, and monitor your accounts for unusual activity.",
    },
    {
      q: "Can ScamShield detect every scam?",
      a: "No security tool catches 100% of new threats. ScamShield uses advanced indicators and AI to help you assess risk, but human vigilance remains your best defense.",
    },
    {
      q: "Should I share an OTP with customer support?",
      a: "Never. One-time passcodes and verification codes are strictly for your eyes only. Real customer support agents will never ask for your OTP.",
    },
    {
      q: "How can I verify a suspicious website?",
      a: "Check the spelling of the domain in your browser address bar very carefully, look up the company independently, or test the URL with ScamShield.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-100 selection:text-zinc-950">

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-zinc-800 px-6 py-20 lg:py-28 bg-gradient-to-b from-zinc-900/40 to-zinc-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300 shadow-sm">
              <ShieldCheck size={14} className="text-zinc-100" /> SCAM AWARENESS CENTER
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Learn to spot scams before you click.
            </h1>

            <p className="text-base md:text-lg text-zinc-400 leading-relaxed font-normal max-w-lg">
              Scams are designed to look trustworthy. Learn how to recognize the warning signs in messages, emails, websites, phone calls, and online offers.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#common-scams"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 shadow-sm"
              >
                Start Learning <ArrowRight size={16} />
              </a>
              <Link
                href="/scan"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-700 hover:text-white shadow-sm"
              >
                Scan Something Suspicious
              </Link>
            </div>
          </div>

          {/* Realistic Hero Visual: Smartphone Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl relative space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500" />
                  <span className="text-xs font-semibold text-zinc-200">Security Alert</span>
                </div>
                <span className="text-[10px] font-medium text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">New Message</span>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-3">
                <p className="text-xs font-medium text-zinc-200 leading-relaxed">
                  &quot;Your account requires immediate verification. Your account may be suspended if you don&apos;t verify your information.&quot;
                </p>
                <div className="pt-1">
                  <div className="w-full py-2.5 bg-white text-zinc-950 rounded-xl text-center text-xs font-semibold shadow-sm">
                    Verify Account
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs text-rose-300 bg-rose-950/40 border border-rose-900/60 px-3 py-2 rounded-xl">
                  <span className="flex items-center gap-1.5 font-medium">
                    <AlertTriangle size={14} className="text-rose-400" /> Urgency Detected
                  </span>
                  <span className="text-[10px] font-bold text-rose-400 bg-rose-900/60 px-2 py-0.5 rounded">High Risk</span>
                </div>
                <div className="flex items-center justify-between text-xs text-amber-300 bg-amber-950/40 border border-amber-900/60 px-3 py-2 rounded-xl">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Globe size={14} className="text-amber-400" /> Suspicious Link
                  </span>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-900/60 px-2 py-0.5 rounded">Warning</span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400 font-medium">ScamShield Analysis</span>
                <span className="text-xs font-bold text-rose-400 bg-rose-950/60 border border-rose-900 px-2.5 py-1 rounded-lg">
                  3 warning signs detected
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. REAL WORLD SCAM EXAMPLES */}
      <section className="border-b border-zinc-800 px-6 py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Scams don&apos;t always look like scams.
            </h2>
            <p className="text-zinc-400 text-sm md:text-base">
              Modern scams often imitate real companies, familiar conversations, and legitimate services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Example 1: Email */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-zinc-400" />
                  <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Email Phishing</span>
                </div>
                <span className="text-xs text-rose-400 font-semibold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900">Fake</span>
              </div>
              <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 space-y-2 text-xs">
                <p className="font-semibold text-zinc-200">Subject: Your account requires verification</p>
                <p className="text-zinc-400 leading-relaxed">
                  We detected unusual sign-in activity. Confirm your password within 24 hours to prevent account closure.
                </p>
                <div className="inline-block px-3 py-1.5 bg-white text-zinc-950 rounded-lg font-medium mt-1">
                  Verify Now
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">Why it fools people:</strong> Uses standard corporate email styling and creates a fake sense of urgency.
              </p>
            </div>

            {/* Example 2: SMS */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-zinc-400" />
                  <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">SMS Text Scam</span>
                </div>
                <span className="text-xs text-rose-400 font-semibold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900">Fake</span>
              </div>
              <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 space-y-2 text-xs">
                <p className="text-zinc-400 leading-relaxed font-medium">
                  Your package could not be delivered. Confirm your address to reschedule delivery at track-parcel-support.net
                </p>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">Why it fools people:</strong> Everyone orders packages online, making delivery notifications feel ordinary and expected.
              </p>
            </div>

            {/* Example 3: Website */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-zinc-400" />
                  <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Fake Login Website</span>
                </div>
                <span className="text-xs text-rose-400 font-semibold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900">Fake</span>
              </div>
              <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 space-y-2 text-xs">
                <div className="p-2 bg-zinc-900 rounded border border-zinc-800 font-mono text-[11px] text-rose-400">
                  https://secure-login-bank-support.com
                </div>
                <p className="text-zinc-200 font-semibold">Secure Account Login</p>
                <div className="h-6 bg-zinc-900 rounded border border-zinc-800" />
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">Why it fools people:</strong> Copies the exact brand logo and login boxes of a trusted bank or service.
              </p>
            </div>

            {/* Example 4: Phone Call */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-zinc-400" />
                  <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Phone Call Impersonation</span>
                </div>
                <span className="text-xs text-rose-400 font-semibold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900">Fake</span>
              </div>
              <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 space-y-2 text-xs">
                <p className="text-zinc-400 leading-relaxed italic">
                  &quot;Hello, this is fraud prevention. Your bank account has been flagged for suspicious wire transfers. Please confirm your PIN.&quot;
                </p>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">Why it fools people:</strong> Uses an authoritative tone and pretends to protect you from harm.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. COMMON SCAMS (Interactive Navigation System) */}
      <section id="common-scams" className="border-b border-zinc-800 px-6 py-20 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Know the most common scams
            </h2>
            <p className="text-zinc-400 text-sm">
              Select a scam category below to understand how it works and how to protect yourself.
            </p>
          </div>

          {/* Category Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {scamCategories.map((cat, idx) => {
              const isActive = activeScamCategory === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveScamCategory(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                    isActive
                      ? "bg-white text-zinc-950 border-white shadow-sm"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>

          {/* Active Scam Details Card */}
          <motion.div
            key={activeScamCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-10 space-y-8 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
              <div>
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Category</span>
                <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                  {scamCategories[activeScamCategory].title}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-semibold">
                Education Center
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">What it looks like</span>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-200 leading-relaxed">
                    {scamCategories[activeScamCategory].example}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">What scammers want</span>
                  <div className="flex flex-wrap gap-2">
                    {scamCategories[activeScamCategory].whatTheyWant.map((item, wIdx) => (
                      <span key={wIdx} className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700/60">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Warning Signs</span>
                  <ul className="space-y-2">
                    {scamCategories[activeScamCategory].warningSigns.map((sign, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                        <XCircle size={15} className="text-rose-400 shrink-0 mt-0.5" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/30 p-4 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-400" /> What you should do
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {scamCategories[activeScamCategory].action}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. SPOT THE RED FLAGS (Interactive Inspection) */}
      <section className="border-b border-zinc-800 px-6 py-20 bg-zinc-950">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Can you spot what&apos;s wrong?
            </h2>
            <p className="text-zinc-400 text-sm">
              Hover over the highlighted parts of the suspicious message below to understand why scammers use them.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-10 space-y-8 shadow-sm">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 md:p-8 text-sm md:text-base text-zinc-200 leading-loose text-center shadow-sm">
              &quot;
              <span
                onMouseEnter={() => setHoveredFlag("URGENT")}
                onMouseLeave={() => setHoveredFlag(null)}
                className={`cursor-pointer px-2 py-0.5 rounded transition-all font-semibold ${
                  hoveredFlag === "URGENT" ? "bg-rose-950 text-rose-300 underline" : "text-rose-400 bg-rose-950/40"
                }`}
              >
                URGENT
              </span>
              : Your{" "}
              <span
                onMouseEnter={() => setHoveredFlag("bank account")}
                onMouseLeave={() => setHoveredFlag(null)}
                className={`cursor-pointer px-2 py-0.5 rounded transition-all font-semibold ${
                  hoveredFlag === "bank account" ? "bg-amber-950 text-amber-300 underline" : "text-amber-400 bg-amber-950/40"
                }`}
              >
                bank account
              </span>{" "}
              will be{" "}
              <span
                onMouseEnter={() => setHoveredFlag("closed today")}
                onMouseLeave={() => setHoveredFlag(null)}
                className={`cursor-pointer px-2 py-0.5 rounded transition-all font-semibold ${
                  hoveredFlag === "closed today" ? "bg-rose-950 text-rose-300 underline" : "text-rose-400 bg-rose-950/40"
                }`}
              >
                closed today
              </span>
              . Verify your account{" "}
              <span
                onMouseEnter={() => setHoveredFlag("within 30 minutes")}
                onMouseLeave={() => setHoveredFlag(null)}
                className={`cursor-pointer px-2 py-0.5 rounded transition-all font-semibold ${
                  hoveredFlag === "within 30 minutes" ? "bg-rose-950 text-rose-300 underline" : "text-rose-400 bg-rose-950/40"
                }`}
              >
                within 30 minutes
              </span>
              .{" "}
              <span
                onMouseEnter={() => setHoveredFlag("Verify Now")}
                onMouseLeave={() => setHoveredFlag(null)}
                className={`cursor-pointer px-2 py-0.5 rounded transition-all font-semibold ${
                  hoveredFlag === "Verify Now" ? "bg-blue-950 text-blue-300 underline" : "text-blue-400 bg-blue-950/40"
                }`}
              >
                [Verify Now]
              </span>
              &quot;
            </div>

            {/* Explanation box */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 min-h-[100px] flex flex-col justify-center shadow-sm">
              {hoveredFlag && flagExplanations[hoveredFlag] ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    <span className="text-xs font-bold text-white uppercase tracking-wide">
                      {flagExplanations[hoveredFlag].title}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {flagExplanations[hoveredFlag].desc}
                  </p>
                </motion.div>
              ) : (
                <div className="text-center text-xs text-zinc-500">
                  Hover over any highlighted text segment above to discover why it is a red flag.
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 5. SCAM OR SAFE? (Mini Training Experience) */}
      <section className="border-b border-zinc-800 px-6 py-20 bg-zinc-900/30">
        <div className="max-w-3xl mx-auto space-y-10">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Would you fall for it?
            </h2>
            <p className="text-zinc-400 text-sm">
              Test your threat radar with real-world scenarios.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-10 space-y-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <span className="text-xs font-semibold text-zinc-500 uppercase">Example {currentQuiz + 1} of {quizzes.length}</span>
              <span className="text-xs font-medium text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded-lg">{quizzes[currentQuiz].type}</span>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-3">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Sender: {quizzes[currentQuiz].sender}</span>
              <p className="text-sm md:text-base text-zinc-200 leading-relaxed font-medium">
                &quot;{quizzes[currentQuiz].content}&quot;
              </p>
            </div>

            {!quizAnswered ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setUserChoice("safe");
                    setQuizAnswered(true);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900 text-sm font-semibold text-zinc-300 hover:border-zinc-700 hover:text-white transition-all shadow-sm"
                >
                  Safe
                </button>
                <button
                  onClick={() => {
                    setUserChoice("suspicious");
                    setQuizAnswered(true);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-sm font-semibold text-zinc-950 hover:bg-zinc-200 transition-all shadow-sm"
                >
                  Suspicious
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pt-4 border-t border-zinc-800"
              >
                <div className="flex items-center gap-3">
                  {userChoice === (quizzes[currentQuiz].isScam ? "suspicious" : "safe") ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-900 text-emerald-400 text-xs font-bold">
                      <Check size={14} /> Good catch! Correct answer.
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-900 text-rose-400 text-xs font-bold">
                      <XCircle size={14} /> This one was tricky.
                    </span>
                  )}
                  <span className="text-xs text-zinc-400">
                    This scenario is: <strong className="text-white">{quizzes[currentQuiz].isScam ? "Suspicious / Scam" : "Legitimate"}</strong>
                  </span>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                  <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Key Warning Signs</span>
                  <ul className="space-y-1.5">
                    {quizzes[currentQuiz].warningSigns.map((w, wIdx) => (
                      <li key={wIdx} className="flex items-center gap-2 text-xs text-zinc-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" /> {w}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setQuizAnswered(false);
                      setUserChoice(null);
                      setCurrentQuiz((prev) => (prev + 1) % quizzes.length);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors shadow-sm"
                  >
                    Next Example →
                  </button>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </section>

      {/* 6. WHAT SCAMMERS WANT */}
      <section className="border-b border-zinc-800 px-6 py-20 bg-zinc-950">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              What are scammers after?
            </h2>
            <p className="text-zinc-400 text-sm">
              Understanding their goals helps you recognize why they send specific messages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Money",
                icon: TrendingUp,
                desc: "Direct wire transfers, cryptocurrency deposits, or gift card purchases.",
                example: '"Pay $50 customs fee immediately via crypto."',
              },
              {
                title: "Passwords",
                icon: Key,
                desc: "Access credentials to your email, bank accounts, or social media profiles.",
                example: '"Enter your current password to verify your identity."',
              },
              {
                title: "OTP & Verification Codes",
                icon: Shield,
                desc: "One-time passcodes sent via SMS to bypass two-factor authentication.",
                example: '"Send me the 6-digit code you just received."',
              },
              {
                title: "Credit Card Details",
                icon: CreditCard,
                desc: "Card numbers, expiration dates, and CVV codes for unauthorized charges.",
                example: '"Update your card on file to prevent cancellation."',
              },
              {
                title: "Personal Information",
                icon: FileText,
                desc: "Social Security numbers, birthdates, and full names for identity theft.",
                example: '"Confirm your full home address and ID number."',
              },
              {
                title: "Account Access",
                icon: Lock,
                desc: "Total control over your digital identity to scam your contacts next.",
                example: '"Click this link to restore your locked profile."',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-4 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-[11px] text-zinc-300 italic">
                    {item.example}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. BEFORE YOU CLICK */}
      <section className="border-b border-zinc-800 px-6 py-20 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Before you click, ask yourself these 5 questions.
            </h2>
            <p className="text-zinc-400 text-sm">
              A simple mental checklist for everyday digital safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { num: "01", q: "Do I know who sent this?", desc: "Check the actual email address or sender number, not just the display name." },
              { num: "02", q: "Was I expecting this message?", desc: "Unexpected alerts about packages, bank accounts, or security are high-risk." },
              { num: "03", q: "Is it creating unnecessary urgency?", desc: "Scammers rush you so you don't take time to think or verify." },
              { num: "04", q: "Is it asking for sensitive information?", desc: "Legitimate services rarely ask for passwords or verification codes directly." },
              { num: "05", q: "Can I verify it another way?", desc: "Log in through official bookmarks or apps instead of clicking message links." },
            ].map((item, idx) => (
              <div key={idx} className={`rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-2 shadow-sm ${idx === 4 ? "md:col-span-2" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-zinc-950">
                    {item.num}
                  </span>
                  <h3 className="text-sm font-bold text-white">{item.q}</h3>
                </div>
                <p className="text-xs text-zinc-400 pl-10 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. WHAT TO DO IF YOU ALREADY CLICKED */}
      <section className="border-b border-zinc-800 px-6 py-20 bg-zinc-950">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Already clicked something suspicious?
            </h2>
            <p className="text-zinc-400 text-sm">
              Don&apos;t panic. Follow these calm, practical steps to secure your accounts immediately.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { title: "Stop", desc: "Don't continue interacting with the page, application, or sender." },
              { title: "Disconnect", desc: "If your device is behaving strangely or you downloaded an unknown file, disconnect from the internet." },
              { title: "Secure", desc: "Change your important account passwords immediately from a separate, trusted device." },
              { title: "Check", desc: "Review recent account activity, bank transactions, and active login sessions." },
              { title: "Report", desc: "Report the incident to the relevant service provider or local cyber authority." },
              { title: "Scan", desc: "Use ScamShield to analyze the suspicious URL, message, email, or phone number." },
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-bold text-zinc-950">
                  {idx + 1}
                </span>
                <div className="space-y-1 pt-0.5">
                  <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-zinc-500 pt-2">
            Disclaimer: ScamShield is an informational security tool designed to help assess risk and cannot guarantee detection of every scam.
          </p>

        </div>
      </section>

      {/* 9. SCAMSHIELD CONNECTION */}
      <section className="border-b border-zinc-800 px-6 py-20 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Not sure? Let ScamShield check it.
            </h2>
            <p className="text-zinc-400 text-sm">
              Scan links, emails, phone numbers, and text messages instantly before you take action.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "URL", icon: Globe, desc: "Check suspicious links." },
              { title: "EMAIL", icon: Mail, desc: "Analyze suspicious email content." },
              { title: "PHONE", icon: Phone, desc: "Check suspicious phone numbers." },
              { title: "TEXT", icon: MessageSquare, desc: "Analyze suspicious messages." },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-3 shadow-sm">
                  <div className="h-9 w-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Visual Pipeline Showcase */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center text-center">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase">Step 1</span>
                <p className="text-xs font-bold text-zinc-200">Suspicious Content</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase">Step 2</span>
                <p className="text-xs font-bold text-zinc-200">ScamShield Engine</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase">Step 3</span>
                <p className="text-xs font-bold text-zinc-200">Risk Assessment</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase">Step 4</span>
                <p className="text-xs font-bold text-zinc-200">Clear Action</p>
              </div>
            </div>
            <p className="text-center text-xs text-zinc-400 leading-relaxed">
              ScamShield analyzes available security signals and AI-based indicators to help you assess suspicious content.
            </p>
          </div>

        </div>
      </section>

      {/* 10. QUICK SAFETY GUIDE */}
      <section className="border-b border-zinc-800 px-6 py-20 bg-zinc-950">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Simple habits that make you harder to scam
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Pause before acting", desc: "Urgency is a common manipulation technique designed to bypass logic." },
              { title: "Verify independently", desc: "Always use the organization's official website or downloaded app." },
              { title: "Protect your codes", desc: "Never share OTPs or verification codes with anyone." },
              { title: "Check the address", desc: "Look carefully at the actual web domain before typing credentials." },
              { title: "Don't trust appearance alone", desc: "A professional-looking message can still be entirely fraudulent." },
            ].map((habit, idx) => (
              <div key={idx} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-2 shadow-sm">
                <h3 className="text-sm font-bold text-white">{habit.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{habit.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="border-b border-zinc-800 px-6 py-20 bg-zinc-900/30">
        <div className="max-w-3xl mx-auto space-y-10">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-white transition-colors hover:bg-zinc-800/50 text-sm"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                        <div className="px-5 pb-5 text-xs md:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className="px-6 py-24 bg-zinc-950 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Something doesn&apos;t feel right?
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-md mx-auto">
            You don&apos;t have to guess. Scan it before you trust it.
          </p>
          <div className="pt-2">
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 shadow-sm"
            >
              Scan with ScamShield <ArrowRight size={16} />
            </Link>
          </div>
          <p className="text-xs font-medium text-zinc-500 pt-2">
            URL · Email · Phone · Text
          </p>
        </div>
      </section>

    </div>
  );
}