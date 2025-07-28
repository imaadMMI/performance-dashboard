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
      className={"w-29 bg-[var(--color-nb-cream)] flex flex-col py-9 transition-all duration-300 ease-in-out"}
    >
      {/* National Bonds Logo - Centered horizontally only */}
      <div className="mb-10 flex items-center justify-center">
        <div
          className={"w-28 h-28 flex items-center justify-center"}
        >
          <ImageWithFallback
            src={"/logo.png"}
            alt="OES Logo"
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
                  className={`flex ${"justify-center"
                    }`}
                >
                  <button
                    aria-label={item.label}
                    className={`${"w-19 h-19 justify-center"
                      } ${item.isActive
                        ? "bg-white text-[var(--color-nb-nickel)]"
                        : "text-[var(--color-nb-nickel)] hover:bg-white hover:bg-opacity-50"
                      } flex items-center transition-colors`}
                  >
                    <IconComponent size={39} />
                  </button>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Gold Circle - Links to Speak to NADA */}
      <div
        className={"flex justify-center"}
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
