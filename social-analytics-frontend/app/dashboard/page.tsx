"use client";

import { useEffect, useState } from "react";
import StatCard from "./components/StatCard";
import StatCardSkeleton from "./components/StatCardSkeleton";
import FollowersChart from "./components/FollowersChart";
import ChartSkeleton from "./components/ChartSkeleton";

interface DashboardData {
  stats: {
    followers: number;
    engagement: number;
    posts: number;
    reach: number;
  };
  followersGrowth: { date: string; followers: number }[];
}

const [range, setRange] = useState("7");
const [platform, setPlatform] = useState("all");

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDashboard = async () => {
  try {
    setLoading(true);
    setError(false);

    const res = await fetch(
      `http://localhost:5000/dashboard?range=${range}&platform=${platform}`
    );

    if (!res.ok) throw new Error("API failed");

    const json = await res.json();
    setData(json);
  } catch {
    setError(true);
    setData(null);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
  fetchDashboard();
}, [range, platform]);


  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-white">
        Dashboard Overview
      </h2>

      {/* ERROR STATE */}
      {error && (
        <div className="rounded-xl border border-red-900 bg-red-950 p-6 text-center">
          <p className="text-red-400 mb-3">
            Failed to load dashboard data
          </p>
          <button
            onClick={fetchDashboard}
            className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          data && (
            <>
              <StatCard title="Followers" value={data.stats.followers.toLocaleString()} />
              <StatCard title="Engagement" value={`${data.stats.engagement}%`} />
              <StatCard title="Posts" value={data.stats.posts.toString()} subtitle="This month" />
              <StatCard title="Reach" value={`${data.stats.reach}K`} />
            </>
          )
        )}
      </div>

      {/* FILTER BAR */}
      <div className="flex items-center gap-3">
        <label className="sr-only" htmlFor="range">
          Date range
        </label>
        <select
          id="range"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm text-white"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>

        <label className="sr-only" htmlFor="platform">
          Platform
        </label>
        <select
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm text-white"
        >
          <option value="all">All Platforms</option>
          <option value="instagram">Instagram</option>
          <option value="twitter">Twitter</option>
          <option value="linkedin">LinkedIn</option>
        </select>
      </div>

      



      {/* CHART */}
      <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
        <h3 className="text-lg font-medium text-white mb-4">
          Followers Growth
        </h3>

        {loading ? (
          <ChartSkeleton />
        ) : (
          data && <FollowersChart data={data.followersGrowth} />
        )}
      </div>
    </div>
  );
}
