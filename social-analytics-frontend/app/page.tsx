export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-32 bg-neutral-900 rounded-lg border border-neutral-800" />
        <div className="h-32 bg-neutral-900 rounded-lg border border-neutral-800" />
        <div className="h-32 bg-neutral-900 rounded-lg border border-neutral-800" />
      </div>

      <div className="h-80 bg-neutral-900 rounded-lg border border-neutral-800" />
    </div>
  );
}

