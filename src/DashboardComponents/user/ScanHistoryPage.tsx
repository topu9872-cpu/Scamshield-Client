"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { DeleteProjectDialog } from "./BestUIAlertDialog";
import { getScanHistoryPaginated } from "@/app/api/serverAction";

export default function ScanHistoryPage({ user }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [historyData, setHistoryData] = useState({
    data: [],
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
  });

  const itemsPerPage = 8;

  // ==========================================
  // SEARCH DEBOUNCE
  // ==========================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search ?? "");
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // ==========================================
  // RESET PAGE WHEN FILTER CHANGES
  // ==========================================

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  // ==========================================
  // RISK LEVEL
  // ==========================================

  const getRiskLevel = (item) => {
    if (item.isScam) return "Scam Detected";
    if (item.score > 50) return "Suspicious";
    return "Safe";
  };

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "N/A";
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ==========================================
  // FETCH HISTORY
  // ==========================================

  const fetchScanHistory = async (
    page = 1,
    searchQuery = "",
    filterStatus = "All",
    currentSortBy = "createdAt",
    currentSortOrder = "desc"
  ) => {
    if (!user?.email) {
      toast.error("User email not found.");
      return;
    }

    try {
      setLoading(true);

      const result = await getScanHistoryPaginated(
        user.email,
        page,
        itemsPerPage,
        searchQuery,
        filterStatus,
        currentSortBy,
        currentSortOrder
      );

      setHistoryData({
        data: result.history || [],
        totalCount: Number(result.total) || 0,
        currentPage: Number(result.page) || page,
        totalPages: Number(result.totalPages) || 1,
      });
    } catch (error) {
      console.error("Error fetching scan history:", error);
      toast.error("Failed to load scan history");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH WHEN PARAMETERS CHANGE
  // ==========================================

  useEffect(() => {
    fetchScanHistory(
      currentPage ?? 1,
      debouncedSearch ?? "",
      activeFilter ?? "All",
      sortBy ?? "createdAt",
      sortOrder ?? "desc"
    );
  }, [
    currentPage,
    debouncedSearch,
    activeFilter,
    sortBy,
    sortOrder,
  ]);

  // ==========================================
  // NEXT PAGE
  // ==========================================

  const goToNextPage = () => {
    if (
      currentPage < historyData.totalPages &&
      !loading
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // ==========================================
  // PREVIOUS PAGE
  // ==========================================

  const goToPreviousPage = () => {
    if (currentPage > 1 && !loading) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // ==========================================
  // ELLIPSIS PAGINATION
  // ==========================================
const getPaginationPages = () => {
  const totalPages = Number(historyData.totalPages) || 1;
  const current = Number(currentPage) || 1;

  if (totalPages <= 3) {
    return Array.from(
      { length: totalPages },
      (_, i) => i + 1
    );
  }

  if (current === 1) {
    return [1, "ellipsis", totalPages];
  }

  if (current === totalPages) {
    return [1, "ellipsis", totalPages];
  }

  return [1, "ellipsis", current, "ellipsis", totalPages];
};
  return (
    <div className="min-h-screen bg-[#07070a] text-neutral-200 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ==========================================
            SEARCH + SORT
        ========================================== */}

        <div className="flex flex-col md:flex-row gap-4 bg-[#0b0b10] p-4 rounded-xl border border-white/10">

          {/* SEARCH */}

          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-2.5 text-neutral-600"
              size={16}
            />

            <input
              placeholder="Search by value or type..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-[#07070a] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:border-white/30 outline-none"
            />
          </div>

          {/* SORT */}

          <select
            className="bg-[#07070a] border border-white/10 rounded-lg max-w-xs px-4 py-2 text-sm outline-none cursor-pointer"
            value={`${sortBy}_${sortOrder}`}
            onChange={(e) => {
              const [field, order] =
                e.target.value.split("_");

              setSortBy(field);
              setSortOrder(order);
              setCurrentPage(1);
            }}
          >
            <option value="createdAt_desc">
              Latest Date
            </option>

            <option value="createdAt_asc">
              Oldest Date
            </option>

            <option value="score_desc">
              Risk Level: High to Low
            </option>

            <option value="score_asc">
              Risk Level: Low to High
            </option>

            <option value="type_asc">
              Type (A-Z)
            </option>

            <option value="type_desc">
              Type (Z-A)
            </option>
          </select>
        </div>

        {/* ==========================================
            TABLE
        ========================================== */}

        <div className="bg-[#0b0b10] border border-white/10 rounded-2xl overflow-hidden">

          <table className="w-full text-left text-sm">

            <thead className="bg-white/5 text-neutral-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">
                  Type
                </th>

                <th className="px-6 py-4">
                  Value
                </th>

                <th className="px-6 py-4">
                  Date
                </th>

                <th className="px-6 py-4">
                  Score
                </th>

                <th className="px-6 py-4">
                  Risk Level
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">

              <AnimatePresence mode="popLayout">

                {/* LOADING */}

                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-neutral-500 text-sm"
                    >
                      <div className="flex items-center justify-center gap-2">

                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white/30" />

                        Loading...

                      </div>
                    </td>
                  </tr>

                ) : historyData.data.length > 0 ? (

                  /* DATA */

                  historyData.data.map(
                    (item, index) => {

                      const risk =
                        getRiskLevel(item);

                      const rowKey =
                        item._id ||
                        item.id ||
                        index;

                      return (
                        <motion.tr
                          key={rowKey}
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          exit={{
                            opacity: 0,
                          }}
                        >

                          {/* TYPE */}

                          <td className="px-6 py-4 font-mono text-xs uppercase">
                            {item.type}
                          </td>

                          {/* VALUE */}

                          <td className="px-6 py-4 truncate max-w-50">
                            {item.value}
                          </td>

                          {/* DATE */}

                          <td className="px-6 py-4 text-neutral-400 text-xs">
                            {formatDate(
                              item.createdAt
                            )}
                          </td>

                          {/* SCORE */}

                          <td className="px-6 py-4 font-mono text-xs">

                            <span
                              className={`px-2 py-0.5 rounded font-bold ${
                                (item.score ?? 0) >
                                70
                                  ? "text-red-400 bg-red-500/10"
                                  : (item.score ??
                                        0) > 40
                                  ? "text-yellow-400 bg-yellow-500/10"
                                  : "text-emerald-400 bg-emerald-500/10"
                              }`}
                            >
                              {item.score ?? 0}/100
                            </span>

                          </td>

                          {/* RISK */}

                          <td className="px-6 py-4">

                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                risk === "Safe"
                                  ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/10"
                                  : risk ===
                                    "Suspicious"
                                  ? "border-yellow-500/20 text-yellow-500 bg-yellow-500/10"
                                  : "border-red-500/20 text-red-500 bg-red-500/10"
                              }`}
                            >
                              {risk}
                            </span>

                          </td>

                          {/* ACTION */}

                          <td className="px-6 py-4 text-right">
                            <DeleteProjectDialog
                              item={item}
                            />
                          </td>

                        </motion.tr>
                      );
                    }
                  )

                ) : (

                  /* EMPTY */

                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-neutral-500 text-sm"
                    >
                      No results found for your filter.
                    </td>
                  </tr>

                )}

              </AnimatePresence>

            </tbody>
          </table>
        </div>

        {/* ==========================================
            PAGINATION
        ========================================== */}

        {historyData.totalPages > 1 && (

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0b0b10] p-4 rounded-xl border border-white/10">

            {/* PAGE INFO */}

            <div className="text-sm text-neutral-400">

              Page{" "}

              <span className="font-semibold text-white">
                {historyData.currentPage}
              </span>

              {" "}of{" "}

              <span className="font-semibold text-white">
                {historyData.totalPages}
              </span>

              {historyData.totalCount > 0 && (
                <span className="ml-4">

                  Total Results:{" "}

                  <span className="font-semibold text-white">
                    {historyData.totalCount}
                  </span>

                </span>
              )}

            </div>

            {/* PAGINATION BUTTONS */}

            <div className="flex items-center gap-1">

              {/* PREVIOUS */}

              <button
                onClick={goToPreviousPage}
                disabled={
                  currentPage === 1 ||
                  loading
                }
                className="flex items-center gap-1 px-3 py-2 bg-white/5 text-white border border-white/10 rounded-lg text-sm font-medium transition-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {/* PAGE NUMBERS */}

              <div className="flex items-center gap-1">

                {getPaginationPages().map(
                  (page, index) => {

                    {/* ELLIPSIS */}

                    if (
                      page ===
                      "ellipsis"
                    ) {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-2 py-2 text-neutral-500 flex items-center justify-center"
                        >
                          <MoreHorizontal
                            size={16}
                          />
                        </span>
                      );
                    }

                    {/* PAGE */}

                    return (
                    <button
  key={page}
  onClick={() => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  }}
  disabled={loading || typeof page !== "number"}
  className={`min-w-9 px-3 py-2 rounded-lg text-sm font-medium transition-none border ${
    currentPage === page
      ? "bg-white text-black border-white"
      : "bg-white/5 text-white border-white/10"
  } disabled:opacity-50`}
>
  {page}
</button>
                    );
                  }
                )}

              </div>

              {/* NEXT */}

              <button
                onClick={goToNextPage}
                disabled={
                  currentPage ===
                    historyData.totalPages ||
                  loading
                }
                className="flex items-center gap-1 px-3 py-2 bg-white/5 text-white border border-white/10 rounded-lg text-sm font-medium transition-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={16} />
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}