import Image from 'next/image';
import Link from 'next/link';
import { PieChart, Pie, Cell } from "recharts";

// Function to get archetype-specific image
const getArchetypeImage = (archetypeName: string): string => {
  // Map archetype names to their image files
  // Add your archetype images to the public folder with these names
  const archetypeImages: { [key: string]: string } = {
    'Strategic Achiever': '/strategicAchiever.jpg',
    'Timeline Focused Planners': '/timelinePlanned.jpg',
    'The Socializer': '/socializer.jpg',
    'The Killer': '/killer.jpg',
    'The Scholar': '/scholar.jpg',
    'The Leader': '/leader.jpg',
    'The Collaborator': '/collaborator.jpg',
    // Add more archetype mappings as needed
  };
  
  // Return the specific image or a default fallback
  return archetypeImages[archetypeName] || '/profile.jpg';
};

interface StudentCardProps {
  tier: number;
  rank: string;
  heading: string;
  profileImage: string;
  successRate: string;
  studentRate: string;
  progressionRate: number;
  quote: string;
  isActive?: boolean;
  onClick?: () => void;
  studentId?: string;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  archetypeName?: string; // Add this for clean archetype name
}



export function StudentCard({
  tier,
  rank,
  heading,
  profileImage,
  successRate,
  studentRate,
  progressionRate,
  quote,
  isActive = false,
  onClick,
  studentId = "0439",
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
  archetypeName,
}: StudentCardProps) {
  return (
    <Link href={`/students/${studentId}`} onClick={onClick}>
      <div 
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`
          font-quicksand
          bg-white rounded p-7 
          w-[300px] max-w-[300px] min-w-[300px]
          flex-shrink-0 snap-start 
          border border-[#f0f0f0]

          transition-all duration-200 ease-in-out
          cursor-pointer
          ${isHovered ? 'opacity-100  ' : (isActive ? 'opacity-100  ' : 'opacity-40')}
        `}
      >
      {/* Tier and Rank */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <div>
            <strong className="font-montserrat text-[16px] text-[#797A79]">Tier {tier}</strong>
            {/* <hr className="my-1 w-14 border-t-2 border-black m-0" /> */}
            <div className="my-0.3 w-14 h-0.75 relative">
                <div className={"absolute inset-0 bg-gradient-to-r from-[#797A79] to-white"}></div>
                {/* <div className={`absolute inset-0 bg-gradient-to-r from-[#FF8A00] to-white transition-opacity duration-300 ease-out ${(isActive || isHovered) ? 'opacity-100' : 'opacity-0'}`}></div> */}
            </div>
          </div>
          <span className="font-montserrat font-mono text-[24px] font-semibold text-[#797A79]">{rank}</span>
        </div>
      </div>

      {/* Heading */}
      <h5 className="font-semibold mb-5 text-[1.25rem]" dangerouslySetInnerHTML={{__html: heading}}></h5>

      {/* Profile + Stats */}
      <div className="flex items-center mb-6">
        <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden flex-shrink-0 mr-4">
          <Image
            src={getArchetypeImage(archetypeName || heading.replace(/<br\/>/g, ' '))}
            alt={`${archetypeName || heading} Avatar`}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1 items-center">
          <div className="border rounded px-3 py-2 flex items-center justify-center font-semibold border-[#f1f1f1] w-[145px] text-[0.85rem]">
            <span className="mr-2">{successRate}</span>
            <span className="text-[#444]">of success</span>
          </div>
          <div className="border rounded px-3 py-2 flex items-center justify-center font-semibold border-[#f1f1f1] w-[145px] text-[0.85rem]">
            <span className="mr-2">{studentRate}</span>
            <span className="text-[#444]">of students</span>
          </div>
        </div>
      </div>

      {/* Progression */}
      <div className="bg-white border border-[#f0f0f0] rounded p-5 mb-4">
        <p className="font-montserrat text-sm mb-3">Successful progression</p>
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <p className="font-montserrat text-2xl font-semibold mb-2">{progressionRate}.0%</p>
            <p className="font-montserrat text-black-500 text-xs leading-none mb-1">No withdrawal</p>
          </div>
          <div className="relative -mb-1">
            <PieChart width={72} height={72}>
              <Pie
                data={[
                  { name: "Retention", value: progressionRate },
                  { name: "Remaining", value: 100 - progressionRate },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={31}
                startAngle={90}
                endAngle={-270}
                paddingAngle={0}
                dataKey="value"
              >
                <Cell fill="#ff8a00" />
                <Cell fill="#e5e7eb" />
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-semibold text-[11px]">+{progressionRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="bg-white border border-[#f0f0f0] rounded p-5">
        <p className="font-raleway text-sm font-medium">
          <span className="text-[#ff8a00]">"My wife is really encouraging me to do this</span>
          {' '}and said she'll take on more of the household responsibilities<span className="text-[#ff8a00]">."</span>
        </p>
      </div>
      </div>
    </Link>
  );
}