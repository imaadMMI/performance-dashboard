import Image from 'next/image';

interface StudentCardProps {
  tier: number;
  heading: string;
  profileImage: string;
  successRate: string;
  secondaryRate: string;
  retentionRate: number;
  quote: string;
}

export function StudentCard({
  tier,
  heading,
  profileImage,
  successRate,
  secondaryRate,
  retentionRate,
  quote,
}: StudentCardProps) {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 h-11/12 w-96 flex-shrink-0 flex flex-col space-y-6">
      {/* Tier */}
      <span className="text-md text-gray-500 font-bold flex flex-row justify-between items-center">
        <h1>Tier {tier}</h1>
        <h1 className="text-2xl">0{tier}</h1>
      </span>

      {/* Heading */}
      <h3 className="text-2xl font-bold">{heading}</h3>

      {/* Profile + Success Rates */}
      <div className="flex flex-row items-center space-x-6">
        <Image
          src={profileImage}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col space-y-1">
          <span className="text-md font-semibold">Success Rate: {successRate}</span>
          <span className="text-md text-gray-500">Consistency: {secondaryRate}</span>
        </div>
      </div>

      {/* Retention */}
      <div className="flex flex-row items-center justify-between mt-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Retention Probability</span>
          <span className="text-3xl font-bold text-yellow-500">{retentionRate}%</span>
        </div>
        <div className="relative w-20 h-20">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="10" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#C58E02"
              strokeWidth="10"
              fill="none"
              strokeDasharray={`${retentionRate} ${100 - retentionRate}`}
              strokeDashoffset="25"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
            {retentionRate}%
          </div>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="italic text-gray-700 mt-4 border-l-4 border-gray-300 pl-4">
        "{quote}"
      </blockquote>
    </div>
  );
}

