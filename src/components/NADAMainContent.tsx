import { ArrowUp, ChevronRight } from "lucide-react";
import Link from "next/link";

export function NADAMainContent() {
  const stats = [
    { label: "Calls", value: "103" },
    { label: "Customers", value: "56" },
    { label: "Opportunities", value: "35" },
    { label: "Opportunities taken", value: "13" },
    // Removed Complian stat
  ];

  const behaviors = [
    { name: "Empathy", progress: 85, color: "bg-[var(--color-nb-green)]" },
    { name: "Compliance", progress: 20, color: "bg-gray-400" },
    { name: "Product knowledge", progress: 30, color: "bg-red-500" },
    { name: "De-escalation scene", progress: 60, color: "bg-blue-500" },
  ];

  const callHistory = [
    {
      id: "#1013",
      date: "July 3, 2025",
      summary:
        "This is a 2-3 sentence summary of what was practiced in that session: the key opportunity, the consultant response and NADA's feedback delving into all the key details...",
      score: 73,
      scoreColor: "bg-red-500",
    },
    {
      id: "#1012",
      date: "July 2, 2025",
      summary:
        "This is a 2-3 sentence summary of what was practiced in that session: the key opportunity, the consultant response and NADA's feedback delving into all the key details...",
      score: 43,
      scoreColor: "bg-yellow-500",
    },
  ];

  return (
    <div className="flex-1 bg-white overflow-auto">
      <div className="pl-35 pr-28 py-14 max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="mb-9">
          <div className="flex items-center gap-5 mb-2">
            <span className="text-lg text-[var(--color-nb-nickel)] font-gotham-bold">
              Your average conversation score:
            </span>
            <span className="text-lg font-gotham-bold text-[var(--color-nb-nickel)]">
              79
            </span>
            <div className="flex items-center text-green-500">
              <ArrowUp size={35} />
            </div>
          </div>
          <button className="text-sm text-[var(--color-nb-nickel)] opacity-75 hover:opacity-100 font-gotham-book">
            See the breakdown
          </button>
        </div>

        {/* Stats Section */}
        <div className="mb-9">
          <h3 className="font-gotham-bold text-[var(--color-nb-nickel)] mb-5 text-base">
            Stats
          </h3>
          <div className="flex gap-5">
            {stats.map((stat, index) => {
              // Dynamic width based on text length - increased for "Opportunities taken"
              const widthClass =
                stat.label === "Opportunities taken"
                  ? "w-80"
                  : stat.label.length > 12
                  ? "w-56"
                  : stat.label.length > 8
                  ? "w-49"
                  : "w-42";
              return (
                <div
                  key={index}
                  className={`${widthClass} bg-[var(--color-nb-cream)] p-5 h-35 flex flex-col justify-between`}
                >
                  <div className="text-sm text-[var(--color-nb-nickel)] opacity-75 font-gotham-book">
                    {stat.label}
                  </div>
                  <div className="text-lg font-gotham-bold text-[var(--color-nb-nickel)]">
                    {stat.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Behaviours Section */}
        <div className="mb-9">
          <div className="flex items-center justify-between mb-5 max-w-[1200px]">
            <h3 className="font-gotham-bold text-[var(--color-nb-nickel)] text-base">
              Behaviours
            </h3>
            <button className="text-sm text-[var(--color-nb-nickel)] opacity-75 hover:opacity-100 font-gotham-book flex items-center gap-2">
              See all <ChevronRight size={28} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-5 max-w-[1200px]">
            {behaviors.map((behavior, index) => (
              <div
                key={index}
                className="bg-[var(--color-nb-cream)] p-5 h-49 flex flex-col justify-between"
              >
                <div className="text-sm text-[var(--color-nb-nickel)] opacity-75 font-gotham-book">
                  {behavior.name}
                </div>
                <div className="w-full h-2">
                  <div className={`h-2 w-full ${behavior.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call History Section */}
        <div>
          <div className="flex items-center justify-between mb-5 max-w-[1200px]">
            <h3 className="font-gotham-bold text-[var(--color-nb-nickel)] text-base">
              Call / Session History
            </h3>
            <button className="text-sm text-[var(--color-nb-nickel)] opacity-75 hover:opacity-100 font-gotham-book flex items-center gap-2">
              See all <ChevronRight size={28} />
            </button>
          </div>
          <div className="space-y-4 max-w-[1200px]">
            {callHistory.map((call, index) => (
              <div
                key={index}
                className="bg-[var(--color-nb-cream)] p-5 rounded-lg"
              >
                <Link href={`/call/${call.id.replace("#", "")}`}>
                  <div className="flex items-start justify-between cursor-pointer hover:bg-opacity-80">
                    <div className="flex-1">
                      <div className="flex items-center gap-5 mb-4">
                        <span className="font-gotham-bold text-[var(--color-nb-nickel)] text-sm">
                          Call {call.id}
                        </span>
                        <span className="text-sm text-[var(--color-nb-nickel)] opacity-75 font-gotham-book">
                          {call.date}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-nb-nickel)] opacity-90 font-gotham-book leading-relaxed">
                        {call.summary}
                      </p>
                    </div>
                    <div className="ml-5 flex-shrink-0 flex flex-col items-center justify-between h-28">
                      <div className="bg-gray-100 px-4 py-2 flex flex-col items-center">
                        <span className="text-lg font-gotham-bold text-[var(--color-nb-nickel)]">
                          {call.score}
                        </span>
                        <div className="w-10 h-1 mt-0.5">
                          <div className={`h-1 ${call.scoreColor}`} />
                        </div>
                      </div>
                      <ChevronRight
                        size={28}
                        className="text-[var(--color-nb-nickel)] mt-5"
                        style={{
                          width: "28px",
                          height: "28px",
                          minWidth: "28px",
                          minHeight: "28px",
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
