import Image from 'next/image';
import Link from 'next/link';

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
}: StudentCardProps) {
  return (
    <Link href={`/students/${studentId}`} onClick={onClick}>
      <div 
        className={`
          bg-white rounded p-6 
          w-[270px] max-w-[270px] min-w-[270px]
          flex-shrink-0 snap-start 
          shadow-sm
          transition-all duration-200 ease-in-out
          opacity-40 hover:opacity-100
          hover:shadow-lg hover:-translate-y-1.5
          cursor-pointer
        `}
      >
      {/* Tier and Rank */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <div>
            <strong className="text-[14px] uppercase block font-bold">Tier {tier}</strong>
            <hr className="my-1 w-10 border-t-2 border-black m-0" />
          </div>
          <span className="font-mono text-[22px] font-bold">{rank}</span>
        </div>
      </div>

      {/* Heading */}
      <h5 className="font-bold mb-3 text-[1.25rem]">{heading}</h5>

      {/* Profile + Stats */}
      <div className="flex items-center mb-3">
        <Image
          src={profileImage}
          alt="Profile"
          width={65}
          height={65}
          className="rounded-full mr-4 object-cover"
        />
        <div className="flex flex-col gap-2">
          <div className="border rounded px-4 py-2 flex items-center font-normal border-[#f1f1f1] w-[160px] text-[0.85rem]">
            <span className="mr-2">{successRate}</span>
            <span className="text-[#444]">of success</span>
          </div>
          <div className="border rounded px-4 py-2 flex items-center font-normal border-[#f1f1f1] w-[160px] text-[0.85rem]">
            <span className="mr-2">{studentRate}</span>
            <span className="text-[#444]">of students</span>
          </div>
        </div>
      </div>

      {/* Progression */}
      <div className="bg-gray-100 rounded p-3 mb-3">
        <small className="font-semibold block mb-2">Successful progression</small>
        <div className="flex justify-between items-center">
          <div>
            <strong>{progressionRate}.0%</strong><br />
            <small className="text-black-500 font-semibold">No withdrawal</small>
          </div>
          <div className="
            w-[55px] h-[55px] 
            rounded-full 
            border-4 border-[#cc9900]
            flex items-center justify-center
            ml-3
          ">
            <small className="font-bold">+90%</small>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="bg-white rounded p-3 shadow-sm">
        <small className="font-semibold">
          <span className="text-[#cc9900]">"My wife is really encouraging me to do this</span>
          {' '}and said she'll take on more of the household responsibilities<span className="text-[#ffc107]">."</span>
        </small>
      </div>
      </div>
    </Link>
  );
}