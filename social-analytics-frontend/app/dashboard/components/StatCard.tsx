interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  subtitle?: string;
}

export default function StatCard({
  title,
  value,
  change,
  positive = true,
  subtitle,
}: StatCardProps) {
  return (
    <div className="group relative cursor-pointer">
      {/* Gradient glow */}
      <div className="
        absolute -inset-[1px]
        rounded-xl
        bg-gradient-to-r
        from-indigo-500/20
        via-emerald-500/20
        to-pink-500/20
        opacity-0
        blur-lg
        transition-all
        duration-500
        group-hover:opacity-100
      " />

      {/* Card */}
      <div className="
        relative
        bg-neutral-900
        border border-neutral-800
        rounded-xl
        p-5
        transition-all
        duration-300
        ease-out
        group-hover:-translate-y-1
        group-hover:border-neutral-700
        group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]
      ">
        {/* Title */}
        <p className="text-sm text-neutral-400 tracking-wide uppercase">
          {title}
        </p>

        {/* Value + Change */}
        <div className="mt-2 flex items-end justify-between">
          <h3 className="
            text-2xl
            font-semibold
            text-white
            tracking-tight
            transition-colors
            duration-300
            group-hover:text-white
          ">
            {value}
          </h3>

          {change && (
            <span
              className={`
                text-sm
                font-medium
                transition-colors
                duration-300
                ${positive ? "text-green-500" : "text-red-500"}
              `}
            >
              {change}
            </span>
          )}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-1 text-xs text-neutral-500">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}




