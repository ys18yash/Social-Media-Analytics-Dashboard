export default function ChartSkeleton() {
  return (
    <div className="relative h-64 rounded-xl border border-neutral-800 bg-neutral-900 p-6 overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="h-4 w-40 rounded bg-neutral-800 mb-4" />
      <div className="h-full rounded bg-neutral-800" />
    </div>
  );
}
