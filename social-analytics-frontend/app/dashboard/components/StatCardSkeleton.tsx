export default function StatCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 p-5">
      {/* Shimmer */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="space-y-3">
        <div className="h-3 w-24 rounded bg-neutral-800" />
        <div className="h-6 w-32 rounded bg-neutral-700" />
        <div className="h-3 w-16 rounded bg-neutral-800" />
      </div>
    </div>
  );
}

