"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const CollapsibleSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside
      className={`
        fixed h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-10
        ${isExpanded ? "w-70" : "w-20"}
      `}
    >
      <div className="p-4 space-y-8">
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <svg
            className={`w-6 h-6 text-[#58595b] transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex justify-center px-1">
          {isExpanded ? (
            <Image
              src="/NB logo.png"
              alt="National Bonds"
              width={240}
              height={120}
              className="object-contain w-full max-w-[240px]"
              priority
            />
          ) : (
            <Image
              src="/NB small logo.png"
              alt="National Bonds"
              width={48}
              height={48}
              className="object-contain rounded"
              priority
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <Link
            href="/"
            className={`flex items-center rounded-lg transition-colors duration-200 px-3 py-2 ${
              isActive("/") ? "bg-[#b68d2e]/10" : "hover:bg-[#b68d2e]/5"
            }`}
          >
            <div className="w-6 h-6 flex-shrink-0">
              <svg
                className="w-6 h-6 text-[#58595b]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            {isExpanded && (
              <span
                className={`ml-3 font-medium text-sm whitespace-nowrap ${
                  isActive("/")
                    ? "text-[#b68d2e]"
                    : "text-[#58595b] hover:text-[#b68d2e]"
                }`}
              >
                Home
              </span>
            )}
          </Link>

          <Link
            href="/history"
            className={`flex items-center rounded-lg transition-colors duration-200 px-3 py-2 ${
              isActive("/history") ? "bg-[#b68d2e]/10" : "hover:bg-[#b68d2e]/5"
            }`}
          >
            <div className="w-6 h-6 flex-shrink-0">
              <svg
                className="w-6 h-6 text-[#58595b]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {isExpanded && (
              <span
                className={`ml-3 font-medium text-sm whitespace-nowrap ${
                  isActive("/history")
                    ? "text-[#b68d2e]"
                    : "text-[#58595b] hover:text-[#b68d2e]"
                }`}
              >
                Session History
              </span>
            )}
          </Link>

          <Link
            href="/feedback"
            className={`flex items-center rounded-lg transition-colors duration-200 px-3 py-2 ${
              isActive("/feedback") ? "bg-[#b68d2e]/10" : "hover:bg-[#b68d2e]/5"
            }`}
          >
            <div className="w-6 h-6 flex-shrink-0">
              <svg
                className={`w-6 h-6 ${
                  isActive("/feedback") ? "text-[#b68d2e]" : "text-[#58595b]"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </div>
            {isExpanded && (
              <span
                className={`ml-3 font-medium text-sm whitespace-nowrap ${
                  isActive("/feedback")
                    ? "text-[#b68d2e]"
                    : "text-[#58595b] hover:text-[#b68d2e]"
                }`}
              >
                Feedback
              </span>
            )}
          </Link>
        </nav>

        {/* Settings at bottom */}
        <div className="pt-8 space-y-4">
          <Link
            href="/settings"
            className={`flex items-center rounded-lg transition-colors duration-200 px-3 py-2 ${
              isActive("/settings") ? "bg-[#b68d2e]/10" : "hover:bg-[#b68d2e]/5"
            }`}
          >
            <div className="w-6 h-6 flex-shrink-0">
              <svg
                className="w-6 h-6 text-[#58595b]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {isExpanded && (
              <span
                className={`ml-3 font-medium text-sm whitespace-nowrap ${
                  isActive("/settings")
                    ? "text-[#b68d2e]"
                    : "text-[#58595b] hover:text-[#b68d2e]"
                }`}
              >
                Settings
              </span>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default CollapsibleSidebar;
