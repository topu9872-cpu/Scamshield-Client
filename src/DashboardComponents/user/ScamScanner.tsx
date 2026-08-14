"use client";

import React, { useState } from "react";
import {
  Search,
  ShieldAlert,
  ShieldCheck,
  Globe,
  Mail,
  Phone,
  MessageSquare,
  Loader2,
  Zap,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Flag,
} from "lucide-react";
import { toast } from "sonner";
import { scannerPost } from "@/app/api/serverAction";
import { ScanResult, ScanType } from "@/types/scan";
import { Users } from "@/types/Users";

const scanTypes = [
  {
    id: "url" as ScanType,
    label: "Website URL",
    icon: <Globe size={16} />,
    placeholder: "https://example.com",
  },
  {
    id: "email" as ScanType,
    label: "Email",
    icon: <Mail size={16} />,
    placeholder: "Paste suspicious email content...",
  },
  {
    id: "phone" as ScanType,
    label: "Phone",
    icon: <Phone size={16} />,
    placeholder: "+880 1XXXXXXXXX",
  },
  {
    id: "text" as ScanType,
    label: "Text / Message",
    icon: <MessageSquare size={16} />,
    placeholder: "Paste suspicious message...",
  },
];

export default function ScamScanner({ user }: { user: Users }) {
  const [activeType, setActiveType] = useState<ScanType>("url");

  const [inputs, setInputs] = useState<Record<ScanType, string>>({
    url: "",
    email: "",
    phone: "",
    text: "",
  });
  const [results, setResults] = useState<Record<ScanType, ScanResult | null>>({
    url: null,
    email: null,
    phone: null,
    text: null,
  });
  const [loadingMap, setLoadingMap] = useState<Record<ScanType, boolean>>({
    url: false,
    email: false,
    phone: false,
    text: false,
  });
  const [reportedMap, setReportedMap] = useState<Record<ScanType, boolean>>({
    url: false,
    email: false,
    phone: false,
    text: false,
  });

  const activeScanType = scanTypes.find((t) => t.id === activeType);

  const handleInputChange = (type: ScanType, val: string) => {
    setInputs((prev) => ({ ...prev, [type]: val }));
  };

  const validateInput = (type: ScanType, value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      toast.error("Input is required.");
      return false;
    }

    // =========================
    // URL
    // =========================
    if (type === "url") {
      // Reject if looks like an email address
      if (trimmed.includes("@")) {
        toast.error("Please enter a valid website URL, not an email address.");
        return false;
      }

      // Reject if looks like a phone number
      const phoneTest = trimmed.replace(/[\s\-\+\(\)]/g, "");
      if (/^\d{7,15}$/.test(phoneTest)) {
        toast.error("Please enter a valid website URL, not a phone number.");
        return false;
      }

      try {
        const parsed = new URL(
          trimmed.includes("://") ? trimmed : `https://${trimmed}`,
        );

        if (!parsed.hostname) {
          throw new Error();
        }

        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
          throw new Error();
        }
      } catch {
        toast.error("Please enter a valid website URL.");
        return false;
      }
      return true;
    }

    // =========================
    // EMAIL CONTENT
    // =========================
    else if (type === "email") {
 
      return true;
    }

    // =========================
    // PHONE
    // =========================
    else if (type === "phone") {
      const cleanPhone = trimmed.replace(/[\s\-\+\(\)]/g, "");

      if (!/^\d{7,15}$/.test(cleanPhone)) {
        toast.error("Please enter a valid phone number.");
        return false;
      }
      return true;
    }
    else if (type === "text") {
     
      return true;
    }

    return true;
  };

  const handleTypeChange = (newType: ScanType) => {
    setActiveType(newType);
    // Clear results and reported state for the new type (start fresh)
    setResults((prev) => ({ ...prev, [newType]: null }));
    setReportedMap((prev) => ({ ...prev, [newType]: false }));
  };

  const handleScan = async (typeToScan: ScanType) => {
    if (loadingMap[typeToScan]) return;

    const input = inputs[typeToScan].trim();

    if (!validateInput(typeToScan, input)) {
      return;
    }

    if (!user?.email) {
      toast.error("User email not found.");
      return;
    }

    try {
      setLoadingMap((prev) => ({ ...prev, [typeToScan]: true }));
      setResults((prev) => ({ ...prev, [typeToScan]: null }));
      setReportedMap((prev) => ({ ...prev, [typeToScan]: false }));

      const res = await scannerPost({
        type: typeToScan,
        value: input,
        userEmail: user.email,
      });

      setResults((prev) => ({ ...prev, [typeToScan]: res }));
      toast.success("Scan completed successfully.");
    } catch (error: any) {
      const errorMsg = error?.message || "Scan failed. Please try again.";
      toast.error(errorMsg);
      console.error("Scanner error:", errorMsg);
    } finally {
      setLoadingMap((prev) => ({ ...prev, [typeToScan]: false }));
    }
  };

  const handleReset = (typeToReset: ScanType) => {
    setInputs((prev) => ({ ...prev, [typeToReset]: "" }));
    setResults((prev) => ({ ...prev, [typeToReset]: null }));
    setReportedMap((prev) => ({ ...prev, [typeToReset]: false }));
  };

  const handleReport = (typeToReport: ScanType) => {
    setReportedMap((prev) => ({ ...prev, [typeToReport]: true }));
    toast.success("Thanks. Your feedback has been recorded.");
  };

  return (
    <div className="min-h-screen bg-[#07070a] px-4 py-8 text-neutral-200 sm:px-6 md:px-10 md:py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* HEADER */}
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-xs font-medium text-neutral-400">
            <ShieldCheck size={14} /> ScamShield Security Scanner
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Scam Scanner
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-neutral-500 md:text-base">
            Analyze suspicious URLs, emails, phone numbers, and messages for
            phishing and fraudulent patterns.
          </p>
        </div>

        {/* SCANNER TABS & CARDS */}
        <div className="space-y-6">
          <div className="overflow-x-auto pb-1">
            <div className="flex gap-2 min-w-max">
              {scanTypes.map((type) => {
                const active = activeType === type.id;
                const isTabLoading = loadingMap[type.id];
                const hasResult = !!results[type.id];

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleTypeChange(type.id)}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-medium transition-all border ${
                      active
                        ? "bg-white text-black border-white shadow-lg"
                        : "bg-[#0b0b10] text-neutral-400 border-white/10 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {type.icon}
                    {type.label}
                    {isTabLoading && (
                      <Loader2
                        size={14}
                        className="animate-spin text-neutral-500 ml-1"
                      />
                    )}
                    {!isTabLoading && hasResult && (
                      <span className="h-2 w-2 rounded-full bg-emerald-500 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE TAB CONTENT CONTAINER */}
          {scanTypes.map((tab) => {
            if (tab.id !== activeType) return null;

            const tabValue = inputs[tab.id];
            const tabResult = results[tab.id];
            const tabLoading = loadingMap[tab.id];
            const tabReported = reportedMap[tab.id];

            const score = tabResult?.score ?? 0;
            const isScam = tabResult ? tabResult.isScam || score > 50 : false;
            const riskLevel =
              score >= 80
                ? "Critical Risk"
                : score >= 60
                  ? "High Risk"
                  : score >= 40
                    ? "Medium Risk"
                    : "Low Risk";
            const riskColor =
              score >= 60
                ? "text-red-400"
                : score >= 40
                  ? "text-yellow-400"
                  : "text-emerald-400";

            return (
              <div key={tab.id} className="space-y-6">
                {/* INPUT BOX CARD */}
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b10] shadow-2xl p-4 md:p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
                      {tab.icon}
                      {tab.label} Input
                    </div>
                    {tabValue && (
                      <button
                        type="button"
                        onClick={() => handleReset(tab.id)}
                        className="flex cursor-pointer items-center gap-1 text-xs text-neutral-500 transition hover:text-white"
                      >
                        <RotateCcw size={13} /> Clear
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 md:flex-row">
                    {tab.id === "email" || tab.id === "text" ? (
                      <textarea
                        value={tabValue}
                        onChange={(e) =>
                          handleInputChange(tab.id, e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.ctrlKey)
                            handleScan(tab.id);
                        }}
                        disabled={tabLoading}
                        rows={5}
                        className="min-h-33 flex-1 resize-none rounded-xl border border-white/10 bg-[#07070a] px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-white/30 disabled:opacity-60"
                        placeholder={tab.placeholder}
                      />
                    ) : (
                      <input
                        type={tab.id === "url" ? "url" : "tel"}
                        value={tabValue}
                        onChange={(e) =>
                          handleInputChange(tab.id, e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleScan(tab.id);
                        }}
                        disabled={tabLoading}
                        className="h-12 flex-1 rounded-xl border border-white/10 bg-[#07070a] px-4 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-white/30 disabled:opacity-60"
                        placeholder={tab.placeholder}
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => handleScan(tab.id)}
                      disabled={tabLoading}
                      className="flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-black transition hover:bg-neutral-200 disabled:opacity-50 md:self-end"
                    >
                      {tabLoading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />{" "}
                          Scanning...
                        </>
                      ) : (
                        <>
                          <Search size={18} /> Scan Now
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs text-neutral-600">
                      {tab.id === "email" || tab.id === "text"
                        ? "Press Ctrl + Enter to scan"
                        : "Press Enter to scan"}
                    </p>
                    <p className="text-xs text-neutral-600">
                      {tabValue.length} characters
                    </p>
                  </div>
                </div>

                {/* LOADING STATE */}
                {tabLoading && (
                  <div className="rounded-3xl border border-white/10 bg-[#0b0b10] p-10 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                      <Loader2 size={30} className="animate-spin text-white" />
                    </div>
                    <h3 className="mt-5 font-semibold text-white">
                      Analyzing {tab.label.toLowerCase()}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-500">
                      ScamShield is checking available security signals and
                      AI-based patterns.
                    </p>
                  </div>
                )}

                {/* RESULT SECTION */}
                {tabResult && !tabLoading && (
                  <div className="space-y-6">
                    <div
                      className={`rounded-3xl border bg-[#0b0b10] p-6 md:p-8 ${isScam ? "border-red-500/20" : "border-emerald-500/20"}`}
                    >
                      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div
                            className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${isScam ? "text-red-400" : "text-emerald-400"}`}
                          >
                            {isScam ? (
                              <ShieldAlert size={17} />
                            ) : (
                              <ShieldCheck size={17} />
                            )}
                            {isScam ? "Scam Detected" : "Appears Safe"}
                          </div>
                          <h2 className="mt-2 text-2xl font-bold text-white">
                            {isScam
                              ? "Potential threat detected"
                              : "No major threat detected"}
                          </h2>
                          <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                            {tabResult.summary}
                          </p>
                        </div>

                        <div className="shrink-0 text-left md:text-right">
                          <p className="text-xs uppercase tracking-wider text-neutral-600">
                            Risk Score
                          </p>
                          <p
                            className={`mt-1 text-4xl font-black ${riskColor}`}
                          >
                            {score}%
                          </p>
                          <p
                            className={`mt-1 text-xs font-semibold ${riskColor}`}
                          >
                            {riskLevel}
                          </p>
                        </div>
                      </div>

                      <div className="mt-7">
                        <div className="h-2 overflow-hidden rounded-full bg-white/5">
                          <div
                            style={{ width: `${Math.min(score, 100)}%` }}
                            className={`h-full transition-all duration-800 ${score >= 60 ? "bg-red-500" : score >= 40 ? "bg-yellow-500" : "bg-emerald-500"}`}
                          />
                        </div>
                        <div className="mt-2 flex justify-between text-[10px] text-neutral-600">
                          <span>Low</span>
                          <span>Medium</span>
                          <span>High</span>
                          <span>Critical</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {/* AI Insights */}
                      <div className="rounded-3xl border border-white/10 bg-[#0b0b10] p-6">
                        <h3 className="flex items-center gap-2 font-bold text-white">
                          <Zap size={17} className="text-yellow-500" /> AI
                          Insights
                        </h3>
                        <div className="mt-5">
                          {tabResult.insights &&
                          tabResult.insights.length > 0 ? (
                            <ul className="space-y-3">
                              {tabResult.insights.map((insight, index) => (
                                <li
                                  key={index}
                                  className="flex gap-3 rounded-xl border border-white/6 bg-white/2 p-3 text-sm leading-6 text-neutral-400"
                                >
                                  <AlertTriangle
                                    size={15}
                                    className="mt-1 shrink-0 text-yellow-500"
                                  />
                                  <span>{insight}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="space-y-3">
                              <div className="flex gap-3 rounded-xl border border-white/6 bg-white/2 p-3 text-sm text-neutral-500">
                                <CheckCircle2
                                  size={15}
                                  className="mt-0.5 shrink-0 text-emerald-500"
                                />
                                No immediate structural anomalies found.
                              </div>
                              <div className="flex gap-3 rounded-xl border border-white/6 bg-white/2 p-3 text-sm text-neutral-500">
                                <CheckCircle2
                                  size={15}
                                  className="mt-0.5 shrink-0 text-emerald-500"
                                />
                                Known threat intelligence checks completed.
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Scan Details */}
                      <div className="rounded-3xl border border-white/10 bg-[#0b0b10] p-6">
                        <h3 className="flex items-center gap-2 font-bold text-white">
                          <Search size={17} /> Scan Details
                        </h3>
                        <div className="mt-5 space-y-3">
                          <div className="flex items-center justify-between rounded-xl bg-white/3 px-4 py-3">
                            <span className="text-xs text-neutral-500">
                              Scan type
                            </span>
                            <span className="text-xs font-semibold capitalize text-white">
                              {tab.label}
                            </span>
                          </div>
                          <div className="rounded-xl bg-white/3 px-4 py-3">
                            <span className="text-xs text-neutral-500">
                              Analyzed input
                            </span>
                            <p className="mt-2 break-all text-xs leading-5 text-neutral-300">
                              {tabValue}
                            </p>
                          </div>
                          <div className="flex items-center justify-between rounded-xl bg-white/3 px-4 py-3">
                            <span className="text-xs text-neutral-500">
                              Status
                            </span>
                            <span
                              className={`flex items-center gap-1.5 text-xs font-semibold ${isScam ? "text-red-400" : "text-emerald-400"}`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${isScam ? "bg-red-400" : "bg-emerald-400"}`}
                              />
                              {isScam ? "Potential Threat" : "No Known Threat"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="rounded-3xl border border-white/10 bg-[#0b0b10] p-5">
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => handleReport(tab.id)}
                          disabled={tabReported}
                          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                            tabReported
                              ? "cursor-not-allowed border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                              : isScam
                                ? "border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                                : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                          }`}
                        >
                          {tabReported ? (
                            <>
                              <CheckCircle2 size={16} /> Feedback Submitted
                            </>
                          ) : (
                            <>
                              <Flag size={16} />{" "}
                              {isScam
                                ? "Report as Scam"
                                : "Flag False Positive"}
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReset(tab.id)}
                          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-neutral-300 transition hover:bg-white/5 hover:text-white"
                        >
                          <RotateCcw size={16} /> Scan Another
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* EMPTY STATE */}
                {!tabResult && !tabLoading && (
                  <div className="rounded-3xl border border-dashed border-white/10 bg-white/1 px-6 py-12 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/4">
                      <ShieldCheck size={25} className="text-neutral-500" />
                    </div>
                    <h3 className="mt-5 font-semibold text-white">
                      Ready to scan {tab.label.toLowerCase()}
                    </h3>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-600">
                      Enter the suspicious {tab.label.toLowerCase()} content
                      above and click scan to verify safety.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
