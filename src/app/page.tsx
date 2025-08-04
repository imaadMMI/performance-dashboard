
"use client";

import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const tiles = [
  {
    title: "Student\narchetypes",
    href: "/students/",
    mainData: "MOL-TP5",
    secondaryData: "13 Student archetypes",
  },
  {
    title: "Sales\ncoaching",
    href: "/sales",
    mainData: "2456",
    secondaryData: "Calls processed",
  },
  {
    title: "Service\ninsights",
    href: "/insights",
    mainData: "414 hours",
    secondaryData: "Cumulative call duration",
  },
  {
    title: "Propensity\nmodelling",
    href: "/propensity",
    mainData: "93%",
    secondaryData: "Predictive accuracy",
  },
];

export default function Home() {
  return (
    <Layout>
      <main className="h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-11/12 max-w-2xl">
          {tiles.map((tile, index) => (
            <Link key={index} href={tile.href}>
              <div
                className="group bg-(--brand-light) px-10 py-6 aspect-square flex flex-col justify-between transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between pt-4">
                  <h2 className="text-2xl font-semibold transition-colors duration-200 group-hover:text-(--brand-gold) whitespace-pre-line">
                    {tile.title}
                  </h2>
                  <div className="bg-white rounded-full p-2 transition-all duration-200 group-hover:scale-110">
                    <ArrowUpRight
                      size={28}
                      className="transition-colors duration-200 group-hover:text-(--brand-gold)"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start pb-8">
                  <p className="text-2xl font-semibold text-gray-500">
                    {tile.mainData}
                  </p>
                  <p className="text-1xl text-gray-500 font-semibold">
                    {tile.secondaryData}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}

