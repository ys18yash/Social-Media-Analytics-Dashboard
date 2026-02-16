"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartPoint {
  date: string;
  followers: number;
}

export default function FollowersChart({
  data,
}: {
  data: ChartPoint[];
}) {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#737373" fontSize={12} />
          <YAxis stroke="#737373" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="followers"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 shadow-xl">
      <p className="text-xs text-neutral-400">{label}</p>
      <p className="text-sm font-semibold text-white">
        {payload[0].value.toLocaleString()} followers
      </p>
    </div>
  );
}
