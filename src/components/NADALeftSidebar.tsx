"use client";

import { Home, RotateCcw, User, Users } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const navigationItems = [
  { href: "/", icon: Home, label: "Home", isActive: true },
  { href: "/history", icon: RotateCcw, label: "Session History", isActive: false },
  { href: "/settings", icon: User, label: "Settings", isActive: false },
  { href: "/feedback", icon: Users, label: "Feedback", isActive: false },
];

function IconButton({ href, Icon, label, isActive }: {
  href: string;
  Icon: React.ElementType;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link href={href}>
      <div className="group relative flex justify-center">
        <button
          aria-label={label}
          className={`
            flex items-center justify-center w-12 h-12 rounded-md
            transition-all duration-200 text-brand-black
            ${isActive
              ? "bg-brand-white"
              : "bg-brand-white bg-opacity-0 hover:bg-opacity-20"}
            group-hover:scale-105
          `}
        >
          <Icon size={30} />
        </button>

        {/* Tooltip on hover */}
        <div className="
          absolute left-full ml-3 top-1/2 -translate-y-1/2 
          bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded shadow-lg
          opacity-0 group-hover:opacity-100 group-hover:translate-x-1 
          transition-all duration-200 pointer-events-none whitespace-nowrap
        ">
          {label}
        </div>
      </div>
    </Link>
  );
}


export function LeftSidebar() {
  return (
    <div className="flex flex-col w-32 bg-gray-100 py-6 transition-all duration-500 ease-in-out">
      {/* Logo */}
      <div className="flex items-center justify-center mt-8">
        <div className="w-1/2">
          <ImageWithFallback
            src="/logo.png"
            alt="OES Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col flex-1 justify-center gap-8 mt-8">
        {navigationItems.map((item, index) => (
          <IconButton
            key={index}
            href={item.href}
            Icon={item.icon}
            label={item.label}
            isActive={item.isActive}
          />
        ))}
      </nav>

      {/* Bottom gold circle */}
      <div className="flex justify-center">
        <Link href="/conversation?scene=No preference. Let's just talk.">
          <div className="w-12 h-12 rounded-full bg-brand-gold shadow-lg cursor-pointer flex items-center justify-center transition-colors hover:bg-opacity-90 duration-200" />
        </Link>
      </div>
    </div>
  );
}

