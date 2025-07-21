import { Play } from "lucide-react";
import Link from "next/link";

export function NADARightSidebar() {
  const recommendedScenes = [
    {
      title: "De-escalation scenarios",
      description: "Respond to a customer complaint or frustration",
      difficulty: "RECOMMENDED",
    },
    {
      title: "Compliance training",
      description: "Respond to a customer complaint or frustration",
      difficulty: "RECOMMENDED",
    },
    {
      title: "Upselling techniques",
      description: "Respond to a customer complaint or frustration",
      difficulty: "RECOMMENDED",
    },
    {
      title: "Showing empathy",
      description: "Respond to a customer complaint or frustration",
      difficulty: "RECOMMENDED",
    },
  ];

  return (
    <div className="w-208 bg-[var(--color-nb-cream)] p-12">
      {/* Header */}
      <h2 className="font-gotham-bold text-[var(--color-nb-nickel)] text-lg mb-12 text-center">
        Speak to NADA
      </h2>

      {/* Practice Session Circle - Plain white with shadow */}
      <div className="flex flex-col items-center mb-12">
        <Link href="/conversation?scene=No preference. Let's just talk.">
          <div className="w-48 h-48 rounded-full bg-white mb-6 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow border border-gray-300">
            {/* Empty circle with shadow only */}
          </div>
        </Link>
        <Link href="/conversation?scene=No preference. Let's just talk.">
          <button className="text-sm text-[var(--color-nb-nickel)] font-gotham-book hover:underline border-b-4 border-yellow-400 pb-1">
            Start a general session &gt;
          </button>
        </Link>
      </div>

      {/* OR Divider */}
      <div className="text-center mb-8">
        <span className="text-[var(--color-nb-nickel)] opacity-50 font-gotham-book text-sm">
          OR
        </span>
      </div>

      {/* Practice a scene section - Center aligned */}
      <div className="mb-8 text-center">
        <h3 className="font-gotham-bold text-[var(--color-nb-nickel)] mb-6 text-sm">
          Practice a scene:
        </h3>
      </div>

      {/* Recommended Scenes */}
      <div className="grid grid-cols-2 gap-6">
        {recommendedScenes.map((scene, index) => (
          <Link
            key={index}
            href={`/conversation?scene=${encodeURIComponent(scene.title)}`}
          >
            <div className="cursor-pointer hover:opacity-80 transition-opacity">
              {/* Square Thumbnail with dark grey play button and recommended tag */}
              <div className="w-full aspect-video bg-white flex items-center justify-center mb-3 relative border border-gray-300 shadow-md">
                {/* Dark grey triangle play button */}
                <Play className="text-gray-600" size={40} fill="currentColor" />

                {/* RECOMMENDED tag in top right */}
                <div className="absolute top-2 right-2 bg-[var(--color-nb-cream)] px-2">
                  <span className="text-[var(--color-nb-nickel)] font-gotham-book uppercase text-xs">
                    RECOMMENDED
                  </span>
                </div>
              </div>

              {/* Text Content Below - Left aligned */}
              <div className="text-left">
                <h4 className="font-gotham-bold text-[var(--color-nb-nickel)] text-sm mb-2">
                  {scene.title}
                </h4>
                <p className="text-xs text-[var(--color-nb-nickel)] opacity-75 font-gotham-book leading-relaxed">
                  {scene.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
