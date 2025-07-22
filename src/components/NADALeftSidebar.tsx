"use client";

import {
  Home,
  RotateCcw,
  User,
  Users,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Link from "next/link";
import { useState } from "react";

export function NADALeftSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigationItems = [
    { href: "/", icon: Home, label: "Home", isActive: true },
    {
      href: "/history",
      icon: RotateCcw,
      label: "Session History",
      isActive: false,
    },
    { href: "/settings", icon: User, label: "Settings", isActive: false },
    { href: "/feedback", icon: Users, label: "Feedback", isActive: false },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-29" : "w-80"
      } bg-[var(--color-nb-cream)] flex flex-col py-9 transition-all duration-300 ease-in-out`}
    >
      {/* Toggle Button */}
      <div
        className={`${
          isCollapsed ? "flex justify-center" : "flex justify-end pr-6"
        } mb-6`}
      >
        <button
          onClick={toggleSidebar}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="w-8 h-8 text-[var(--color-nb-nickel)] hover:bg-white hover:bg-opacity-50 flex items-center justify-center transition-colors rounded"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* National Bonds Logo - Centered horizontally only */}
      <div className="mb-10 flex items-center justify-center">
        <div
          className={`${
            isCollapsed ? "w-28 h-28" : "w-80 h-40"
          } flex items-center justify-center`}
        >
          <ImageWithFallback
            src={isCollapsed ? "/NB small logo.png" : "/NB logo.png"}
            alt="National Bonds Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Navigation Icons - Fixed layout */}
      <div className="flex flex-col flex-1 justify-center">
        <nav className="flex flex-col gap-11">
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link key={index} href={item.href}>
                <div
                  className={`flex ${
                    isCollapsed ? "justify-center" : "justify-start pl-6"
                  }`}
                >
                  <button
                    aria-label={item.label}
                    className={`${
                      isCollapsed
                        ? "w-19 h-19 justify-center"
                        : "w-auto h-12 justify-start px-4 gap-4 rounded-lg"
                    } ${
                      item.isActive
                        ? "bg-white text-[var(--color-nb-nickel)]"
                        : "text-[var(--color-nb-nickel)] hover:bg-white hover:bg-opacity-50"
                    } flex items-center transition-colors`}
                  >
                    <IconComponent size={39} />
                    {!isCollapsed && (
                      <span className="font-gotham-medium text-sm text-[var(--color-nb-nickel)]">
                        {item.label}
                      </span>
                    )}
                  </button>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Gold Circle - Links to Speak to NADA */}
      <div
        className={`${
          isCollapsed ? "flex justify-center" : "flex justify-center px-6"
        }`}
      >
        <Link href="/conversation?scene=No preference. Let's just talk.">
          <div
            className="w-16 h-16 rounded-full cursor-pointer hover:bg-yellow-200 transition-colors flex items-center justify-center shadow-xl"
            style={{
              backgroundColor: "#EEE4C8",
              boxShadow: "0 8px 16px rgba(139, 69, 19, 0.6)",
            }}
          >
            {/* Optional: Add an icon or leave empty for solid gold circle */}
          </div>
        </Link>
      </div>
    </div>
  );
}
