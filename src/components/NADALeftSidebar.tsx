import { Home, RotateCcw, User, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Link from "next/link";

export function NADALeftSidebar() {
  return (
    <div className="w-29 bg-[var(--color-nb-cream)] flex flex-col items-center py-9">
      {/* National Bonds Logo Placeholder */}
      <div className="w-28 h-28 mb-10 flex items-center justify-center">
        <ImageWithFallback
          src="/NB small logo.png"
          alt="National Bonds Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Navigation Icons - positioned to have profile in middle of page */}
      <div className="flex flex-col flex-1 justify-center items-center">
        <nav className="flex flex-col gap-11 mb-42">
          {/* Dashboard - Active state with white background */}
          <Link href="/">
            <button
              aria-label="Dashboard"
              className="w-19 h-19 bg-white text-[var(--color-nb-nickel)] flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <Home size={39} />
            </button>
          </Link>

          {/* History */}
          <Link href="/history">
            <button
              aria-label="Session History"
              className="w-19 h-19 text-[var(--color-nb-nickel)] hover:bg-white hover:bg-opacity-50 flex items-center justify-center transition-colors"
            >
              <RotateCcw size={39} />
            </button>
          </Link>

          {/* Profile Icon */}
          <Link href="/settings">
            <button
              aria-label="Profile"
              className="w-19 h-19 text-[var(--color-nb-nickel)] hover:bg-white hover:bg-opacity-50 flex items-center justify-center transition-colors"
            >
              <User size={39} />
            </button>
          </Link>

          {/* Team/Users Icon */}
          <Link href="/feedback">
            <button
              aria-label="Team"
              className="w-19 h-19 text-[var(--color-nb-nickel)] hover:bg-white hover:bg-opacity-50 flex items-center justify-center transition-colors"
            >
              <Users size={39} />
            </button>
          </Link>
        </nav>
      </div>

      {/* Bottom Small Yellow Circle */}
      <div className="w-11 h-11 bg-yellow-400 rounded-full">
        {/* Placeholder for future functionality */}
      </div>
    </div>
  );
}
