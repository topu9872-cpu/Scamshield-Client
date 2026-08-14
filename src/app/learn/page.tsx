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
  ExternalLink,
  Copy,
  CheckCheck,
  BookOpen,
  Terminal,
  AlertOctagon,
  LifeBuoy,
} from "lucide-react";

export default function LearnPageBlackTheme() {
  // Common Scams Category State
  const [activeScamCategory, setActiveScamCategory] = useState(0);

  // Spot the Red Flags Hover State
  const [hoveredFlag, setHoveredFlag] = useState<string | null>(null);

  // Mini Training Quiz State
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean | null>(null);
  const [userChoice, setUserChoice] = useState<"safe" | "suspicious" | null>(
    null,
  );

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Interactive Action Modal / Drawer State
  const [modalContent, setModalContent] = useState<{
    title: string;
    subtitle: string;
    description: string;
    deepDive: string[];
    preventionTips: string[];
    type: "deep-guide" | "protocol";
  } | null>(null);

  const scamCategories = [
    {
      title: "Phishing & Credential Harvesters",
      subtitle:
        "Deceptive emails & messages designed to steal login credentials.",
      example:
        '"Your streaming account has been suspended due to an invalid billing profile. Click the link below to verify your identity within 2 hours."',
      whatTheyWant: [
        "Passwords & Account Credentials",
        "Recovery Email Details",
        "Multi-Factor Authorization Access",
      ],
      warningSigns: [
        "Creates false artificial urgency or panic over account termination",
        "Uses a vague or slightly altered lookalike web domain",
        "Generic greetings (e.g., 'Dear Customer') instead of your actual name",
        "Mismatch between the displayed link text and the actual destination URL",
      ],
      action:
        "Never click links in unexpected security alerts. Navigate independently to the official web application or app to review your profile status.",
      deepDive:
        "Phishing is the most widespread cyber threat vector. Attackers rely on social engineering rather than software vulnerabilities. By impersonating trusted brands (banks, streaming services, utility providers), they trick users into willingly surrendering encrypted credentials. Modern spear-phishing even targets specific employees or individuals using gathered background details to make the scam appear 100% legitimate.",
    },
    {
      title: "Lookalike & Spoofed Websites",
      subtitle: "Pixel-perfect clone web portals hosted on malicious domains.",
      example:
        "A web page that looks identical to your online banking portal, but the URL in the address bar is misspelled as b1ank.com or secure-login-bank.net.",
      whatTheyWant: [
        "Full Account Passwords",
        "Real-Time Two-Factor Authentication (OTP) Codes",
        "PIN Numbers & Security Answers",
      ],
      warningSigns: [
        "Subtle misspellings or extra characters in the domain name",
        "Missing or untrusted SSL security certificate warnings in browser",
        "Sudden unexpected redirects from legitimate sites to unfamiliar domains",
        "Prompting for sensitive details out of nowhere without context",
      ],
      action:
        "Always inspect the browser address bar letter-by-letter before entering passwords, PINs, or financial details.",
      deepDive:
        "Typosquatting and domain spoofing exploit human visual habits. Users often glance at the general layout of a page without verifying the exact URL string. Attackers buy domain names that look nearly identical to popular services. Once you type your password on their clone portal, they instantly proxy your session tokens to hijack your real account.",
    },
    {
      title: "Delivery & Customs Fee Frauds",
      subtitle:
        "Bogus package tracking notifications demanding small service fees.",
      example:
        '"Your international package is waiting at our sorting facility. Pay a $2.99 customs clearance fee immediately to reschedule delivery."',
      whatTheyWant: [
        "Credit & Debit Card Details",
        "CVV Security Codes",
        "Home Addresses & Phone Numbers",
      ],
      warningSigns: [
        "Unexpected SMS notifications about parcels you never ordered",
        "Demanding tiny fees to release standard postal deliveries",
        "Links leading to generic tracking domains rather than official carrier sites (FedEx, UPS, DHL, USPS)",
        "Spelling errors and unnatural syntax within the tracking messages",
      ],
      action:
        "Check your recent online shopping orders directly inside official retailer apps or verified shipping courier dashboards.",
      deepDive:
        "Delivery scams exploit the massive volume of online shopping. Because people frequently receive packages, an alert about a delayed parcel triggers immediate curiosity. The small requested fee ($2 to $5) lowers user suspicion, but entering a card unlocks unauthorized recurring subscription charges or full credit card compromise.",
    },
    {
      title: "Account Takeover & Security Alerts",
      subtitle: "Fake breach warnings claiming unauthorized device logins.",
      example:
        '"We noticed a suspicious sign-in attempt from an unrecognized device in a foreign country. Secure your account instantly by verifying your recovery key."',
      whatTheyWant: [
        "Primary Account Control",
        "Secret Recovery Backup Codes",
        "Alternative Email Access",
      ],
      warningSigns: [
        "Unsolicited security warnings out of the blue",
        "Extreme pressure to act within minutes to prevent permanent lockouts",
        "Links leading away from the official domain structure",
        "Requests to download remote desktop utilities or security tools",
      ],
      action:
        "Open your device settings or official app independently to inspect active session histories and authorized devices.",
      deepDive:
        "Account takeover (ATO) attacks weaponize fear. By claiming someone else is inside your account, scammers manipulate you into handing over your recovery codes or disabling security settings. Real security teams will never email you external links asking you to paste your backup keys or reset tokens.",
    },
    {
      title: "Investment & Crypto Schemes",
      subtitle: "High-yield return promises masking fraudulent portfolios.",
      example:
        '"Guaranteed 300% weekly returns on cryptocurrency portfolios with zero risk backed by algorithmic trading bots."',
      whatTheyWant: [
        "Direct Wire Transfers",
        "Cryptocurrency Asset Deposits",
        "Bank Account Direct Debit Access",
      ],
      warningSigns: [
        "Promises of guaranteed high returns with zero financial risk",
        "High-pressure sales tactics urging immediate capital deposits",
        "Withdrawal fees or 'taxes' required before releasing your earnings",
        "Communication conducted entirely through encrypted messaging apps",
      ],
      action:
        "Remember that all legitimate investments carry market risk; guaranteed high returns are an undeniable hallmark of Ponzi schemes and fraud.",
      deepDive:
        "Investment scammers build elaborate fake dashboards showing your portfolio growing exponentially day by day. When you attempt to withdraw your funds, they invent mandatory 'gas fees', 'transfer taxes', or 'withdrawal commissions'. Once you pay those extra fees, they disappear completely with all deposited funds.",
    },
    {
      title: "Job & Work-From-Home Scams",
      subtitle: "Fake employment offers requiring upfront equipment fees.",
      example:
        '"Work from home as a data entry specialist earning $50/hour. Pay $150 upfront for mandatory software setup and hardware kits."',
      whatTheyWant: [
        "Personal Identity Documents (SSN, Passport Scans)",
        "Upfront Equipment Payment / Check Cashing",
      ],
      warningSigns: [
        "Unrealistically high pay rates for minimal entry requirements",
        "Requiring you to purchase equipment or training kits using your own money",
        "Formal interviews conducted purely via text-based chat apps (Telegram, Signal, WhatsApp)",
        "Mailing physical checks for you to deposit and wire a portion back",
      ],
      action:
        "Research hiring companies thoroughly through official corporate portals and never pay out-of-pocket for mandatory employment gear.",
      deepDive:
        "Job scammers prey on job seekers' financial needs. Beyond stealing money through fake equipment kits, these scams often harvest sensitive identity documents (tax forms, passport scans) for identity theft, or involve victims in money laundering rings by making them deposit fraudulent checks and wire cash.",
    },
    {
      title: "Romance & Catfishing Frauds",
      subtitle:
        "Manufactured emotional attachments leading to financial demands.",
      example:
        '"I want to visit you so badly, but my international bank account is frozen and I desperately need money for emergency plane tickets."',
      whatTheyWant: [
        "Money Transfers & Gift Card Codes",
        "Sympathy-Driven Financial Support",
        "Compromising Photos for Extortion",
      ],
      warningSigns: [
        "Rapid emotional escalation and declarations of love within days",
        "Always inventing catastrophic emergencies preventing video calls or in-person meetings",
        "Requesting financial assistance, gift cards, or cryptocurrency from someone they have never met",
        "Refusing to ever appear on live video or meet face-to-face",
      ],
      action:
        "Never send money, financial support, or gift card codes to anyone you have only met online.",
      deepDive:
        "Romance scams operate as long-term psychological operations. Scammers invest weeks or months cultivating emotional dependency before introducing a financial crisis. Once the victim sends money once, the demands escalate endlessly under new fabricated emergencies until the victim runs out of funds or discovers the truth.",
    },
    {
      title: "Phone & Utility Impersonation",
      subtitle:
        "Aggressive robocalls threatening immediate service shutoff or arrest.",
      example:
        '"This is your local utility company or tax agency. Your power will be disconnected or police dispatched within 1 hour unless you pay via gift card."',
      whatTheyWant: [
        "Immediate Untraceable Payments",
        "Sensitive Personal Tax & ID Numbers",
        "Remote Access to Your Computer",
      ],
      warningSigns: [
        "Threatens immediate service shutoff, legal arrest, or deportation",
        "Demands payment via untraceable methods (gift cards, wire transfers, crypto kiosks)",
        "Aggressive, hostile tone refusing to let you hang up or verify details",
        "Caller ID spoofing showing government or utility agency names",
      ],
      action:
        "Hang up immediately and call the official published customer support phone number on your utility bill or tax document.",
      deepDive:
        "Phone scammers rely on intimidation and disorientation. By manufacturing immediate catastrophic consequences (jail, loss of electricity in winter), they prevent victims from thinking critically or consulting family members. Real government and utility agencies never demand instant payment via gift cards or cryptocurrency.",
    },
  ];

  const flagExplanations: Record<string, { title: string; desc: string }> = {
    URGENT: {
      title: "Artificial Urgency & Panic Induction",
      desc: "Scammers artificially compress timeframes to induce panic. When your brain enters a state of panic, critical analytical thinking shuts down, making you much more likely to click malicious links without checking details.",
    },
    "closed today": {
      title: "Fabricated Threat of Severe Loss",
      desc: "By threatening the immediate loss of a critical service (like banking, electricity, or account access), fraudsters create powerful emotional leverage to force compliance.",
    },
    "within 30 minutes": {
      title: "Strict Coercive Time Pressure",
      desc: "Enforcing tight deadlines prevents victims from taking time to verify the story with a trusted friend, family member, or official customer support agent.",
    },
    "Verify Now": {
      title: "High-Risk Credential Harvesting Hook",
      desc: "This call-to-action button is engineered to lead you straight to a fake login portal designed specifically to steal your passwords and session cookies.",
    },
    "bank account": {
      title: "High-Stakes Psychological Hook",
      desc: "Mentioning critical financial services immediately seizes your complete attention and triggers fear of financial ruin.",
    },
  };

  const quizzes = [
    {
      id: 1,
      type: "SMS Text",
      sender: "Courier Service",
      content:
        "Your package could not be delivered because of an incorrect street address. Update your delivery details here: http://track-parcel-update.net/shipping",
      isScam: true,
      warningSigns: [
        "Suspicious web link that does not match the official courier domain",
        "Unsolicited tracking notification when you are not expecting any packages",
        "Creates minor anxiety about a delayed parcel delivery",
      ],
    },
    {
      id: 2,
      type: "Email Notification",
      sender: "Streaming Service Billing",
      content:
        "Your monthly subscription payment failed. To avoid service interruption, please update your billing card on file.",
      isScam: true,
      warningSigns: [
        "Generic greeting ('Dear Customer') instead of your actual name",
        "Vague link leading away from the official billing portal",
        "Creates artificial urgency around service interruption",
      ],
    },
    {
      id: 3,
      type: "In-App Notification",
      sender: "Online Bank Security",
      content:
        "We noticed a routine password update prompt. You can review your security settings anytime inside your official banking mobile app.",
      isScam: false,
      warningSigns: [
        "No external links or urgent threats included",
        "Directs you safely to check your account inside the official app",
        "Calm, informative, and non-coercive tone",
      ],
    },
    {
      id: 4,
      type: "Direct Message",
      sender: "Cryptocurrency Giveaway",
      content:
        "Congratulations! You have been randomly selected to win 2.5 Ethereum. Send 0.05 ETH to our verification wallet to claim your prize instantly.",
      isScam: true,
      warningSigns: [
        "Requires upfront payment or cryptocurrency to claim a free prize",
        "Unsolicited notification about a giveaway or contest you never entered",
        "Uses high-value assets to exploit greed and excitement",
      ],
    },
    {
      id: 5,
      type: "Official Government Alert",
      sender: "Tax Revenue Authority",
      content:
        "Your annual tax assessment is complete. You can securely review your breakdown and update direct deposit preferences by logging into your taxpayer portal.",
      isScam: false,
      warningSigns: [
        "Does not contain external web links or download attachments",
        "Directs you to log into the official protected taxpayer web portal",
        "Professional tone free of threats or artificial deadlines",
      ],
    },
    {
      id: 6,
      type: "Voice Mail / SMS",
      sender: "Utility Provider",
      content:
        "Final Notice: Your electricity will be disconnected within 2 hours due to unpaid balance. Pay immediately at http://power-bill-quick-pay.com",
      isScam: true,
      warningSigns: [
        "Threatens immediate utility shutoff with an extreme time limit",
        "Uses an unofficial web domain instead of the registered utility provider portal",
        "Designed to induce panic and prevent careful thinking",
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-100 selection:text-zinc-950 relative">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-zinc-800 px-6 py-20 lg:py-28 bg-linear-to-b from-zinc-900/40 to-zinc-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-zinc-300 shadow-sm">
              <ShieldCheck size={14} className="text-zinc-100" /> COMPREHENSIVE
              SCAM AWARENESS & DEFENSE CENTER
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Learn to recognize scams before you click.
            </h1>

            <p className="text-base md:text-lg text-zinc-400 leading-relaxed font-normal max-w-xl">
              Modern digital fraud is engineered to mimic trusted entities.
              Explore deep-dive breakdowns, interactive red-flag inspection
              tools, and step-by-step security response protocols to keep your
              digital life secure.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#common-scams"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 shadow-sm"
              >
                Explore Scam Library <ArrowRight size={16} />
              </a>
              <button
                onClick={() =>
                  setModalContent({
                    title: "Instant Verification Protocol",
                    subtitle:
                      "Immediate action checklist when receiving unexpected suspicious communications",
                    description:
                      "When you receive an unexpected message, email, or link, do not interact directly. Follow this rigorous multi-step verification protocol before taking any action:",
                    deepDive: [
                      "Isolate and preserve the communication without clicking any embedded links or downloading attachments.",
                      "Examine the actual underlying sender metadata, domain names, and header routing for inconsistencies.",
                      "Open your official mobile app or verified browser bookmark independently to check your account status.",
                      "If you suspect active compromise, immediately revoke active browser sessions and update your master authentication keys.",
                    ],
                    preventionTips: [
                      "Never trust display names alone; always inspect underlying email addresses and URLs.",
                      "Maintain strict skepticism toward any message creating artificial panic or extreme urgency.",
                    ],
                    type: "protocol",
                  })
                }
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-700 hover:text-white shadow-sm cursor-pointer"
              >
                View Verification Protocol
              </button>
            </div>
          </div>

          {/* Hero Visual Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl relative space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-3.5 w-3.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse" />
                  <span className="text-xs font-bold text-white tracking-wide uppercase">
                    Active Threat Defense
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded-full border border-zinc-700">
                  Protected
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
                    <ShieldAlert size={16} className="text-rose-400" /> Core
                    Security Pillars
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-400">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />{" "}
                      Zero-Trust Link Verification
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />{" "}
                      Credential Isolation Strategy
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />{" "}
                      Multi-Factor Authentication (MFA)
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 text-xs text-zinc-400 leading-relaxed">
                  &quot;Human vigilance combined with robust security protocols
                  is your most powerful shield against sophisticated cyber
                  fraud.&quot;
                </div>
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
              Modern cyber attacks imitate real companies, familiar
              conversations, and legitimate services. Click any example to
              examine its comprehensive defense blueprint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Email Phishing Attack",
                type: "Email Vector",
                snippet:
                  "Subject: Your account requires immediate verification. We detected unusual sign-in activity from an unrecognized location. Confirm your password within 24 hours.",
                modalTitle: "Comprehensive Phishing Defense Blueprint",
                subtitle:
                  "Detailed breakdown of email harvesting tactics and mitigation workflows",
                description:
                  "Phishing emails are crafted to induce anxiety by alleging security breaches or billing failures, compelling users to click malicious links.",
                deepDive: [
                  "Examine the full internet header to uncover mismatched return-path and reply-to domains.",
                  "Never click embedded authentication buttons inside unverified emails.",
                  "Navigate directly to the service provider using your saved browser bookmark to verify account standing.",
                ],
                prevention: [
                  "Enable hardware security keys or authenticator apps instead of SMS verification.",
                  "Treat any unexpected security alert demanding action as high risk.",
                ],
              },
              {
                title: "SMS Delivery Scam",
                type: "SMS Text Vector",
                snippet:
                  "Your package could not be delivered due to an incorrect street address. Confirm your address to reschedule delivery at track-parcel-support.net",
                modalTitle: "Delivery Scam Neutralization Protocol",
                subtitle:
                  "How to identify and block fraudulent courier notifications",
                description:
                  "Fraudsters exploit the massive volume of online deliveries by sending mass text alerts containing malicious tracking URLs.",
                deepDive: [
                  "Never click shortlinks or tracking URLs sent via random mobile numbers.",
                  "Check your recent online shopping orders directly inside official retailer apps (Amazon, FedEx, DHL, UPS).",
                  "Block the sender number and report the SMS as spam immediately.",
                ],
                prevention: [
                  "Bookmark official tracking portals for all major shipping providers.",
                  "Never enter credit card details to release standard postal deliveries.",
                ],
              },
              {
                title: "Fake Login Portal",
                type: "Website URL Vector",
                snippet:
                  "https://secure-login-bank-support.com — Copycat web portal mimicking your official banking login screen with pixel-perfect precision.",
                modalTitle: "Website Spoofing & Typosquatting Defense",
                subtitle:
                  "Inspecting domain authenticity and SSL certificate validity",
                description:
                  "Attackers register lookalike domains and use stolen brand assets to create exact replicas of financial and SaaS login pages.",
                deepDive: [
                  "Inspect the address bar letter-by-letter for subtle character substitutions (e.g., rnarketplace vs marketplace).",
                  "Verify that the SSL certificate organization matches the official corporate entity.",
                  "Close the tab instantly if you arrived via an external message link.",
                ],
                prevention: [
                  "Use a reputable password manager that only auto-fills credentials on exact matching domains.",
                  "Rely exclusively on established bookmarks for sensitive accounts.",
                ],
              },
              {
                title: "Phone Impersonation",
                type: "Voice / Call Vector",
                snippet:
                  '"Hello, this is fraud prevention. Your bank account has been flagged for suspicious wire transfers. Please confirm your PIN and 2FA code."',
                modalTitle: "Voice Spoofing & Phone Scam Mitigation",
                subtitle:
                  "Defending against aggressive robocalls and fraudulent agents",
                description:
                  "Scammers spoof bank and government phone numbers to appear legitimate, using aggressive pressure tactics to steal financial codes.",
                deepDive: [
                  "Recognize that real bank security agents will never ask for your PIN, password, or OTP over the phone.",
                  "Hang up immediately without answering verification questions.",
                  "Dial the official customer support number printed on the back of your payment card.",
                ],
                prevention: [
                  "Never trust caller ID displays, as they are easily spoofed by fraudsters.",
                  "Practice calm detachment when faced with threatening phone calls.",
                ],
              },
            ].map((ex, idx) => (
              <div
                key={idx}
                onClick={() =>
                  setModalContent({
                    title: ex.modalTitle,
                    subtitle: ex.subtitle,
                    description: ex.description,
                    deepDive: ex.deepDive,
                    preventionTips: ex.prevention,
                    type: "deep-guide",
                  })
                }
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm space-y-4 cursor-pointer hover:border-zinc-700 transition-all group"
              >
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Mail
                      size={16}
                      className="text-zinc-400 group-hover:text-white transition-colors"
                    />
                    <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      {ex.title}
                    </span>
                  </div>
                  <span className="text-xs text-rose-400 font-semibold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900">
                    High Risk
                  </span>
                </div>
                <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 space-y-2 text-xs">
                  <p className="text-zinc-400 leading-relaxed italic">
                    &quot;{ex.snippet}&quot;
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                  <span>Click to examine full security blueprint</span>
                  <ArrowRight
                    size={14}
                    className="text-zinc-400 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMMON SCAMS (Interactive Navigation System) */}
      <section
        id="common-scams"
        className="border-b border-zinc-800 px-6 py-20 bg-zinc-900/30"
      >
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Comprehensive Scam Library
            </h2>
            <p className="text-zinc-400 text-sm">
              Select any scam category below to examine deep-dive technical
              mechanics, warning indicators, and mitigation protocols.
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
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border cursor-pointer ${
                    isActive
                      ? "bg-white text-zinc-950 border-white shadow-sm"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  {cat.title.split(" ")[0]}
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
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Threat Category Details
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                  {scamCategories[activeScamCategory].title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {scamCategories[activeScamCategory].subtitle}
                </p>
              </div>
              <button
                onClick={() =>
                  setModalContent({
                    title: scamCategories[activeScamCategory].title,
                    subtitle: scamCategories[activeScamCategory].subtitle,
                    description: scamCategories[activeScamCategory].deepDive,
                    deepDive: [
                      scamCategories[activeScamCategory].action,
                      "Cease all communication immediately with suspicious senders or fake web portals.",
                      "Report fraudulent accounts, phone numbers, and URLs to platform authorities.",
                    ],
                    preventionTips:
                      scamCategories[activeScamCategory].warningSigns,
                    type: "deep-guide",
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors cursor-pointer border border-zinc-700 shrink-0"
              >
                Read Deep-Dive Analysis <ExternalLink size={13} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Real-World Attack Snippet
                  </span>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-200 leading-relaxed italic">
                    {scamCategories[activeScamCategory].example}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    What Attackers Want
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {scamCategories[activeScamCategory].whatTheyWant.map(
                      (item, wIdx) => (
                        <span
                          key={wIdx}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700/65"
                        >
                          {item}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Technical Context
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                    {scamCategories[activeScamCategory].deepDive}
                  </p>
                </div>
              </div>

              <div className="space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Core Warning Indicators
                  </span>
                  <ul className="space-y-2">
                    {scamCategories[activeScamCategory].warningSigns.map(
                      (sign, sIdx) => (
                        <li
                          key={sIdx}
                          className="flex items-start gap-2.5 text-xs text-zinc-400"
                        >
                          <XCircle
                            size={15}
                            className="text-rose-400 shrink-0 mt-0.5"
                          />
                          <span>{sign}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/30 p-4 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-400" />{" "}
                    Recommended Action Protocol
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
              Hover over or click the highlighted segments in the suspicious
              message below to understand the psychological triggers used by
              scammers.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-10 space-y-8 shadow-sm">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 md:p-8 text-sm md:text-base text-zinc-200 leading-loose text-center shadow-sm">
              &quot;
              <span
                onClick={() => setHoveredFlag("URGENT")}
                onMouseEnter={() => setHoveredFlag("URGENT")}
                className="cursor-pointer px-2 py-0.5 rounded transition-all font-semibold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 underline decoration-rose-500/50"
              >
                URGENT
              </span>
              : Your{" "}
              <span
                onClick={() => setHoveredFlag("bank account")}
                onMouseEnter={() => setHoveredFlag("bank account")}
                className="cursor-pointer px-2 py-0.5 rounded transition-all font-semibold text-amber-400 bg-amber-950/40 hover:bg-amber-900/60 underline decoration-amber-500/50"
              >
                bank account
              </span>{" "}
              will be{" "}
              <span
                onClick={() => setHoveredFlag("closed today")}
                onMouseEnter={() => setHoveredFlag("closed today")}
                className="cursor-pointer px-2 py-0.5 rounded transition-all font-semibold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 underline decoration-rose-500/50"
              >
                closed today
              </span>
              . Verify your account{" "}
              <span
                onClick={() => setHoveredFlag("within 30 minutes")}
                onMouseEnter={() => setHoveredFlag("within 30 minutes")}
                className="cursor-pointer px-2 py-0.5 rounded transition-all font-semibold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 underline decoration-rose-500/50"
              >
                within 30 minutes
              </span>
              .{" "}
              <span
                onClick={() => setHoveredFlag("Verify Now")}
                onMouseEnter={() => setHoveredFlag("Verify Now")}
                className="cursor-pointer px-2 py-0.5 rounded transition-all font-semibold text-blue-400 bg-blue-950/40 hover:bg-blue-900/60 underline decoration-blue-500/50"
              >
                [Verify Now]
              </span>
              &quot;
            </div>

            {/* Explanation box */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 min-h-40 flex flex-col justify-center shadow-sm">
              {hoveredFlag && flagExplanations[hoveredFlag] ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                      <span className="text-xs font-bold text-white uppercase tracking-wide">
                        {flagExplanations[hoveredFlag].title}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        setModalContent({
                          title: flagExplanations[hoveredFlag].title,
                          subtitle:
                            "Detailed red-flag analysis and cognitive defense strategy",
                          description: flagExplanations[hoveredFlag].desc,
                          deepDive: [
                            "Recognize that legitimate banking institutions never threaten immediate account termination without prior written notices.",
                            "Take a deep breath and ignore artificial deadlines designed to bypass rational thinking.",
                            "Verify account health directly through official mobile applications or bookmarks.",
                          ],
                          preventionTips: [
                            "Train yourself to pause whenever a message triggers anxiety or urgency.",
                            "Verify through independent communication channels.",
                          ],
                          type: "deep-guide",
                        })
                      }
                      className="text-[11px] text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      Read full psychological breakdown →
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {flagExplanations[hoveredFlag].desc}
                  </p>
                </motion.div>
              ) : (
                <div className="text-center text-xs text-zinc-500">
                  Click or hover over any highlighted text segment above to
                  explore why scammers use specific manipulation tactics.
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
              Test your threat radar with real-world interactive training
              scenarios.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-10 space-y-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <span className="text-xs font-semibold text-zinc-500 uppercase">
                Training Scenario {currentQuiz + 1} of {quizzes.length}
              </span>
              <span className="text-xs font-medium text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded-lg">
                {quizzes[currentQuiz].type}
              </span>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-3">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Sender: {quizzes[currentQuiz].sender}
              </span>
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
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900 text-sm font-semibold text-zinc-300 hover:border-zinc-700 hover:text-white transition-all shadow-sm cursor-pointer"
                >
                  Safe
                </button>
                <button
                  onClick={() => {
                    setUserChoice("suspicious");
                    setQuizAnswered(true);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-sm font-semibold text-zinc-950 hover:bg-zinc-200 transition-all shadow-sm cursor-pointer"
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
                  {userChoice ===
                  (quizzes[currentQuiz].isScam ? "suspicious" : "safe") ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-900 text-emerald-400 text-xs font-bold">
                      <Check size={14} /> Correct decision! Excellent threat
                      radar.
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-900 text-rose-400 text-xs font-bold">
                      <XCircle size={14} /> This scenario contained hidden
                      indicators.
                    </span>
                  )}
                  <span className="text-xs text-zinc-400">
                    Verdict:{" "}
                    <strong className="text-white">
                      {quizzes[currentQuiz].isScam
                        ? "Suspicious / Scam"
                        : "Legitimate"}
                    </strong>
                  </span>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                  <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                    Analysis & Warning Signs
                  </span>
                  <ul className="space-y-1.5">
                    {quizzes[currentQuiz].warningSigns.map((w, wIdx) => (
                      <li
                        key={wIdx}
                        className="flex items-center gap-2 text-xs text-zinc-400"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />{" "}
                        {w}
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
                    className="px-6 py-2.5 rounded-xl bg-white text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
                  >
                    Next Training Scenario →
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
              Understanding attacker objectives helps you recognize why they
              demand specific information. Click any card for detailed asset
              protection strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Financial Funds & Assets",
                icon: TrendingUp,
                desc: "Direct wire transfers, cryptocurrency deposits, or gift card code purchases.",
                example: '"Pay $50 customs fee immediately via crypto kiosk."',
                action:
                  "Never wire money or buy gift cards for unknown online contacts.",
                deepDive: [
                  "Fraudsters use irreversible payment methods (crypto, gift cards, wire transfers) to ensure stolen funds cannot be charged back or recovered.",
                  "Always verify recipient identities through independent, trusted communication channels before sending funds.",
                ],
              },
              {
                title: "Account Passwords",
                icon: Key,
                desc: "Access credentials to your email, banking portals, and social media profiles.",
                example:
                  '"Enter your current master password to verify your identity."',
                action:
                  "Use unique passwords and a secure password manager across all platforms.",
                deepDive: [
                  "Credential stuffing attacks test leaked password pairs across thousands of websites simultaneously.",
                  "Enabling unique passwords for every site prevents a single data breach from compromising your entire digital life.",
                ],
              },
              {
                title: "OTP & Verification Codes",
                icon: Shield,
                desc: "One-time passcodes sent via SMS to bypass two-factor authentication barriers.",
                example:
                  '"Send me the 6-digit code you just received on your phone."',
                action:
                  "Never share your OTP or SMS verification codes with anyone under any circumstance.",
                deepDive: [
                  "Attackers impersonate bank support or account recovery agents, claiming they need your OTP to cancel a fraudulent transaction.",
                  "Giving them your OTP hands them direct authorization to take over your account instantly.",
                ],
              },
              {
                title: "Credit Card Details",
                icon: CreditCard,
                desc: "Card numbers, expiration dates, and CVV security codes for unauthorized charges.",
                example:
                  '"Update your card on file to prevent service cancellation."',
                action:
                  "Only input card information on trusted, verified checkout and billing pages.",
                deepDive: [
                  "Stolen credit card data is quickly monetized through fraudulent online purchases or sold on underground dark web marketplaces.",
                  "Monitor your monthly bank statements vigilantly for unfamiliar micro-charges.",
                ],
              },
              {
                title: "Personal Identification",
                icon: FileText,
                desc: "Social Security numbers, birthdates, and full names for identity theft.",
                example:
                  '"Confirm your full home address and ID document scan."',
                action:
                  "Guard your personal identifiers carefully against unsolicited inquiries.",
                deepDive: [
                  "Identity thieves use gathered personal data to open fraudulent lines of credit, apply for loans, or file fake tax returns in your name.",
                  "Shred physical documents containing sensitive personal info.",
                ],
              },
              {
                title: "Total Account Access",
                icon: Lock,
                desc: "Complete control over your digital identity to exploit your trusted contacts.",
                example: '"Click this link to restore your locked profile."',
                action:
                  "Enable robust multi-factor authentication (MFA) on all important accounts.",
                deepDive: [
                  "Once scammers take over an email or social media account, they message your friends and family pretending to be you in emergency financial distress.",
                  "Always verify urgent requests for money from friends via phone call.",
                ],
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() =>
                    setModalContent({
                      title: `Asset Defense: ${item.title}`,
                      subtitle: `Protecting your sensitive ${item.title.toLowerCase()} from cyber criminals`,
                      description: item.desc,
                      deepDive: item.deepDive,
                      preventionTips: [
                        `Target Risk Vector: ${item.example}`,
                        `Core Defense Strategy: ${item.action}`,
                        "If compromised, immediately revoke active app sessions and update master authentication credentials.",
                      ],
                      type: "deep-guide",
                    })
                  }
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-4 shadow-sm flex flex-col justify-between cursor-pointer hover:border-zinc-700 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-[11px] text-zinc-300 italic flex items-center justify-between">
                    <span>{item.example}</span>
                    <ArrowRight
                      size={13}
                      className="text-zinc-500 shrink-0 ml-2"
                    />
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
              A robust mental checklist for everyday digital safety and threat
              evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                num: "01",
                q: "Do I know who sent this?",
                desc: "Check the actual underlying email address or sender phone number, not just the display name.",
              },
              {
                num: "02",
                q: "Was I expecting this message?",
                desc: "Unexpected alerts regarding parcels, bank accounts, or security updates are high-risk indicators.",
              },
              {
                num: "03",
                q: "Is it creating unnecessary urgency?",
                desc: "Scammers rush you deliberately so you don't take time to think critically or verify the story.",
              },
              {
                num: "04",
                q: "Is it asking for sensitive information?",
                desc: "Legitimate service providers rarely ask for passwords, PINs, or verification codes directly via messages.",
              },
              {
                num: "05",
                q: "Can I verify it another way?",
                desc: "Log in through official browser bookmarks or verified apps instead of clicking embedded message links.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-2 shadow-sm ${idx === 4 ? "md:col-span-2" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-zinc-950">
                    {item.num}
                  </span>
                  <h3 className="text-sm font-bold text-white">{item.q}</h3>
                </div>
                <p className="text-xs text-zinc-400 pl-10 leading-relaxed">
                  {item.desc}
                </p>
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
              Don&apos;t panic. Follow these calm, methodical incident response
              steps to secure your accounts immediately.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "1. Stop",
                desc: "Cease all interaction with the suspicious web page, application, or sender immediately.",
              },
              {
                title: "2. Disconnect",
                desc: "If your device is behaving erratically or you downloaded an unknown file, disconnect from the internet (Wi-Fi and Ethernet) instantly.",
              },
              {
                title: "3. Secure",
                desc: "Change your critical account passwords and master authentication keys immediately from a separate, trusted device.",
              },
              {
                title: "4. Check",
                desc: "Review recent account activity, bank transactions, credit card statements, and active login sessions across all services.",
              },
              {
                title: "5. Report",
                desc: "Report the incident to your bank, relevant service provider, or national cyber crime reporting authority.",
              },
              {
                title: "6. Review",
                desc: "Analyze how the compromise occurred to strengthen your personal security habits moving forward.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-bold text-zinc-950">
                  {idx + 1}
                </span>
                <div className="space-y-1 pt-0.5">
                  <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-zinc-500 pt-2">
            Disclaimer: ScamShield is an educational security resource designed
            to help assess risk and cannot guarantee detection of every cyber
            threat.
          </p>
        </div>
      </section>

      {/* 9. SCAMSHIELD CONNECTION */}
      <section className="border-b border-zinc-800 px-6 py-20 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Understanding ScamShield Protection
            </h2>
            <p className="text-zinc-400 text-sm">
              How multi-vector analysis evaluates suspicious links, emails,
              phone numbers, and messages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "URL Analysis",
                icon: Globe,
                desc: "Inspecting domain age, SSL certificates, and threat blacklists.",
              },
              {
                title: "Email Inspection",
                icon: Mail,
                desc: "Evaluating sender headers, SPF records, and phishing signatures.",
              },
              {
                title: "Phone Verification",
                icon: Phone,
                desc: "Checking carrier logs and known scam number databases.",
              },
              {
                title: "Text Parsing",
                icon: MessageSquare,
                desc: "Detecting coercive language patterns and malicious shortlinks.",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-3 shadow-sm"
                >
                  <div className="h-9 w-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Visual Pipeline Showcase */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center text-center">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase">
                  Stage 1
                </span>
                <p className="text-xs font-bold text-zinc-200">
                  Content Ingestion
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase">
                  Stage 2
                </span>
                <p className="text-xs font-bold text-zinc-200">
                  Heuristic Analysis
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase">
                  Stage 3
                </span>
                <p className="text-xs font-bold text-zinc-200">
                  Threat Scoring
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase">
                  Stage 4
                </span>
                <p className="text-xs font-bold text-zinc-200">
                  Action Guidance
                </p>
              </div>
            </div>
            <p className="text-center text-xs text-zinc-400 leading-relaxed">
              ScamShield synthesizes multiple security indicators and behavioral
              heuristics to provide clear, actionable risk assessments.
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
              {
                title: "Pause before acting",
                desc: "Urgency is a manipulation technique designed to bypass logical reasoning.",
              },
              {
                title: "Verify independently",
                desc: "Always navigate to the organization's official website or downloaded app.",
              },
              {
                title: "Protect your codes",
                desc: "Never share OTPs or multi-factor authentication codes with anyone.",
              },
              {
                title: "Check the address",
                desc: "Examine the exact web domain before entering any credentials.",
              },
              {
                title: "Don't trust appearance",
                desc: "A professional design does not guarantee legitimacy.",
              },
              {
                title: "Keep software updated",
                desc: "Regular updates patch security vulnerabilities across your devices.",
              },
            ].map((habit, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-2 shadow-sm"
              >
                <h3 className="text-sm font-bold text-white">{habit.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {habit.desc}
                </p>
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
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-white transition-colors hover:bg-zinc-800/50 text-sm cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-zinc-400 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
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
            You don&apos;t have to guess. Master threat awareness and keep your
            digital assets secure.
          </p>
          <div className="pt-2">
            <Link
              href={"/scan"}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 shadow-sm cursor-pointer"
            >
              Review Security Summary <ArrowRight size={16} />
            </Link>
          </div>
          <p className="text-xs font-medium text-zinc-500 pt-2">
            URL · Email · Phone · Text · Security Education
          </p>
        </div>
      </section>

      {/* INTERACTIVE DEEP-DIVE MODAL DRAWER */}
      <AnimatePresence>
        {modalContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8 space-y-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={22} className="text-white shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {modalContent.title}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {modalContent.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setModalContent(null)}
                  className="h-8 w-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center text-sm font-semibold transition-colors cursor-pointer shrink-0"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  {modalContent.description}
                </p>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Deep-Dive Analysis & Technical Breakdown:
                  </span>
                  <ul className="space-y-2.5">
                    {modalContent.deepDive.map((item, dIdx) => (
                      <li
                        key={dIdx}
                        className="flex items-start gap-2.5 text-xs text-zinc-300 bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-xl"
                      >
                        <span className="h-5 w-5 rounded-full bg-zinc-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {dIdx + 1}
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Recommended Prevention Measures:
                  </span>
                  <ul className="space-y-2">
                    {modalContent.preventionTips.map((tip, tIdx) => (
                      <li
                        key={tIdx}
                        className="flex items-start gap-2.5 text-xs text-zinc-400 bg-zinc-950/60 border border-zinc-800/50 p-3 rounded-xl"
                      >
                        <CheckCircle2
                          size={15}
                          className="text-emerald-400 shrink-0 mt-0.5"
                        />
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500">
                  ScamShield Security Operations Center
                </span>
                <button
                  onClick={() => setModalContent(null)}
                  className="px-6 py-2.5 bg-white text-zinc-950 text-xs font-semibold rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm"
                >
                  Got it, thank you
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
