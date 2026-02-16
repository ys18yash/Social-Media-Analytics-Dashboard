"use client";

interface Props {
  range: string;
  setRange: (v: any) => void;
  platform: string;
  setPlatform: (v: any) => void;
}

export default function Filters({
  range,
  setRange,
  platform,
  setPlatform,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      {/* RANGE */}
      <div className="flex gap-2">
        {["7d", "30d", "90d"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1 rounded-md text-sm transition
              ${
                range === r
                  ? "bg-emerald-500 text-black"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* PLATFORM */}
      <div className="flex gap-2">
        {["all", "instagram", "twitter", "youtube"].map((p) => (
          <button
            key={p}
            onClick={() => setPlatform(p)}
            className={`px-3 py-1 rounded-md text-sm capitalize transition
              ${
                platform === p
                  ? "bg-indigo-500 text-white"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
