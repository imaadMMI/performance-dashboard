"use client";

import {
  Home,
  RotateCcw,
  User,
  Users
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Link from "next/link";

export function LeftSidebar() {
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
    <div className="flex flex-col transition-all w-1/12 bg-gray-100 py-6 duration-500 ease-in-out">
      {/* National Bonds Logo - Centered horizontally only */}
      <div className="flex items-center justify-center">
        <div className="flex mt-8 items-center justify-center w-1/2">
          <ImageWithFallback
            src={"/logo.png"}
            alt="OES Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Navigation Icons - Fixed layout */}
      <div className="flex flex-col flex-1 justify-center">
        <nav className="flex flex-col gap-8">
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link key={index} href={item.href}>
                <div className="flex justify-center">
                  <button
                    aria-label={item.label}
                    className={`flex items-center justify-center transition-colors w-12 h-12 text-brand-black duration-200 ${
                      item.isActive ? 'bg-brand-white' : 'bg-transparent hover:bg-brand-white hover:bg-opacity-50'
                    }`}
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
      <div className="flex justify-center">
        <Link href="/conversation?scene=No preference. Let's just talk.">
          <div className="rounded-full cursor-pointer flex items-center justify-center transition-colors w-12 h-12 bg-brand-gold hover:bg-opacity-90 duration-200 shadow-lg">
            {/* Optional: Add an icon or leave empty for solid gold circle */}
          </div>
        </Link>
      </div>
    </div>
  );
}
