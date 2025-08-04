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
          bg-white rounded p-10 
          w-[380px] max-w-[380px] min-w-[380px]
          flex-shrink-0 snap-start 
          shadow-sm
          transition-all duration-200 ease-in-out
          opacity-40 hover:opacity-100
          hover:shadow-lg hover:-translate-y-1.5
          cursor-pointer
        `}
      >
      {/* Tier and Rank */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <strong className="text-[16px] uppercase block font-bold">Tier {tier}</strong>
            <hr className="my-1 w-14 border-t-2 border-black m-0" />
          </div>
          <span className="font-mono text-[30px] font-bold">{rank}</span>
        </div>
      </div>

      {/* Heading */}
      <h5 className="font-semibold mb-5 text-[1.5rem]">{heading}</h5>

      {/* Profile + Stats */}
      <div className="flex items-center mb-5">
        <Image
          src={profileImage}
          alt="Profile"
          width={85}
          height={85}
          className="rounded-full mr-5 object-cover"
        />
        <div className="flex flex-col gap-2">
          <div className="border rounded px-5 py-3 flex items-center font-semibold border-[#f1f1f1] w-[210px] text-[0.95rem]">
            <span className="mr-2">{successRate}</span>
            <span className="text-[#444]">of success</span>
          </div>
          <div className="border rounded px-5 py-3 flex items-center font-semibold border-[#f1f1f1] w-[210px] text-[0.95rem]">
            <span className="mr-2">{studentRate}</span>
            <span className="text-[#444]">of students</span>
          </div>
        </div>
      </div>

      {/* Progression */}
      <div className="bg-white border border-[#f1f1f1] rounded p-5 mb-5">
        <p className="font-semibold text-base mb-4">Successful progression</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">{progressionRate}.0%</p>
            <p className="text-black-500 font-semibold text-sm">No withdrawal</p>
          </div>
          <div className="
            w-[70px] h-[70px] 
            rounded-full 
            border-4 border-[#cc9900]
            flex items-center justify-center
            ml-4
          ">
            <span className="font-bold text-base">+90%</span>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="bg-white rounded p-5 shadow-sm">
        <p className="font-semibold text-base">
          <span className="text-[#cc9900]">"My wife is really encouraging me to do this</span>
          {' '}and said she'll take on more of the household responsibilities<span className="text-[#ffc107]">."</span>
        </p>
      </div>
      </div>
    </Link>
  );
}