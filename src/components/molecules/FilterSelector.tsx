import React, { useState } from "react";

export default function FilterSelect() {
  const options = [
    { value: "all", label: "All Students" },
    { value: "successful", label: "Successful Students" },
    { value: "highRisk", label: "High-Risk Students" },
    { value: "atRisk", label: "At-Risk Students" },
  ];

  const [selected, setSelected] = useState(options[0].value);

  return (
    <section className="w-64">
      <label htmlFor="studentFilter" className="block mb-2 text-lg font-medium text-gray-700">
        Filter Students
      </label>
      <select
        id="studentFilter"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="block w-full rounded-md border border-(--brand-light) bg-white py-2 text-lg
                   font-medium text-gray-800 shadow-md focus:outline-none
                   focus:none transition px-1"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </section>
  );
}
