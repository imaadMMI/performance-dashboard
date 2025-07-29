
"use client";

import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const tiles = [
  {
    title: "Student Archetypes",
    href: "/archetypes",
    stat: "918 Calls completed this week",
  },
  {
    title: "Sales Coaching",
    href: "/sales",
    stat: "74 Coaching sessions delivered",
  },
  {
    title: "Service Insights",
    href: "/insights",
    stat: "342 Reports generated",
  },
  {
    title: "Propensity Modelling",
    href: "/propensity",
    stat: "61% Accuracy increase this month",
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
                className="group bg-(--brand-light) p-6 aspect-square flex flex-col justify-between transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold transition-colors duration-200 group-hover:text-(--brand-gold)">
                    {tile.title}
                  </h2>
                  <ArrowUpRight
                    size={28}
                    className="transition-colors duration-200 group-hover:text-(--brand-gold)"
                  />
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  {tile.stat}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}

