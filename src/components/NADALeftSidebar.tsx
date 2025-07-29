
"use client";

import { Home, RotateCcw, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { IconButton } from "./atoms";

const navigationItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/history", icon: RotateCcw, label: "Session History" },
  { href: "/settings", icon: User, label: "Settings" },
  { href: "/feedback", icon: Users, label: "Feedback" },
];

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-32 bg-(--brand-light) py-6 transition-all duration-500 ease-in-out">
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
            isActive={pathname === item.href}
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

