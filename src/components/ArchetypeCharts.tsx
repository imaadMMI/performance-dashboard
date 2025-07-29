"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#C58E02", "#E5E7EB"]; // gold and light gray

const DonutChart = ({ retention }: { retention: number }) => {
  const data = [
    { name: "Retention", value: retention },
    { name: "Remaining", value: 100 - retention },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-sm text-gray-600">Retention Chance</h3>
      <PieChart width={160} height={160}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={35}
          outerRadius={70}
          startAngle={90}
          endAngle={-270}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <span className="text-xl font-semibold text-(--brand-gold)">
        {retention}%
      </span>
    </div>
  );
};

const RetentionTimeline = ({
  timelineData,
}: {
  timelineData: { week: string; value: number }[];
}) => {
  return (
    <div className="w-full h-48">
      <h3 className="text-sm text-gray-600 mb-2">Retention Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={timelineData}>
          <XAxis dataKey="week" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--brand-gold)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function ArchetypeCharts({
  retention = 79,
  timelineData = [
    { week: "W1", value: 55 },
    { week: "W2", value: 65 },
    { week: "W3", value: 72 },
    { week: "W4", value: 79 },
  ],
}: {
  retention?: number;
  timelineData?: { week: string; value: number }[];
}) {
  return (
    <div className="flex flex-row gap-6 p-6 rounded-md shadow-sm bg-white">
      <DonutChart retention={retention} />
      <RetentionTimeline timelineData={timelineData} />
    </div>
  );
}

