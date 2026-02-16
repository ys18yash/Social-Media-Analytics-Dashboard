"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Globe,
  TrendingUp,
  Settings,
  ChevronLeft,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Platforms", href: "/dashboard/platforms", icon: Globe },
  { label: "Trends", href: "/dashboard/trends", icon: TrendingUp },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative h-screen bg-neutral-950 border-r border-neutral-800
      transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* COLLAPSE BUTTON */}
      <button
        aria-label="Toggle sidebar"
        title="Toggle sidebar"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 z-10
        bg-neutral-900 border border-neutral-700
        rounded-full p-1 hover:bg-neutral-800 transition"
      >

        <ChevronLeft
          size={16}
          className={`text-neutral-400 transition-transform duration-300
          ${collapsed ? "rotate-180" : ""}`}
        />
      </button>

      {/* BRAND */}
      <div className="px-6 py-5 border-b border-neutral-800">
        {!collapsed && (
          <>
            <h1 className="text-lg font-semibold text-white">
              Social Analytics
            </h1>
            <p className="text-xs text-neutral-500">
              Performance Dashboard
            </p>
          </>
        )}
      </div>

      {/* NAV */}
      <nav className="mt-4 space-y-1 px-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center gap-3
              rounded-lg px-3 py-2 text-sm font-medium
              transition-all duration-200
              ${
                active
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              {/* ACTIVE INDICATOR */}
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-emerald-500" />
              )}

              <Icon size={18} />

              {!collapsed && <span>{item.label}</span>}

              {/* TOOLTIP WHEN COLLAPSED */}
              {collapsed && (
                <span
                  className="pointer-events-none absolute left-16 z-50
                  whitespace-nowrap rounded-md bg-black px-2 py-1
                  text-xs text-white opacity-0 shadow-lg
                  group-hover:opacity-100"
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* USER */}
      <div className="absolute bottom-0 w-full border-t border-neutral-800 px-4 py-4">
        {!collapsed && (
          <>
            <p className="text-sm font-medium text-white">
              Yash
            </p>
            <p className="text-xs text-neutral-500">
              Free plan
            </p>
          </>
        )}
      </div>
    </aside>
  );
}

