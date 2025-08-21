"use client";

import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import './home.css';

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
      <main className=" font-montserrat min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className=" font-montserrat grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full max-w-2xl">
          {tiles.map((tile, index) => (
            <Link key={index} href={tile.href}>
              <div
                className="font-montserrat group bg-(--brand-light) p-6 sm:px-8 sm:py-6 lg:px-10 lg:py-6 aspect-square flex flex-col justify-between transition-transform hover:-translate-y-1"
              >
                <div className=" font-montserrat flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-semibold transition-colors duration-200 group-hover:text-(--brand-gold) whitespace-pre-line">
                    {tile.title}
                  </h2>
                  <div className="font-montserrat bg-white rounded-full p-2 transition-all duration-200 group-hover:scale-110">
                    <ArrowUpRight
                      size={24}
                      className="transition-colors duration-200 group-hover:text-(--brand-gold) sm:w-7 sm:h-7"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start pb-4 sm:pb-8">
                  <p className=" font-montserrat text-xl sm:text-2xl font-semibold text-gray-500 group-hover:text-(--brand-gold)">
                    {tile.mainData}
                  </p>
                  <p className=" font-montserrat text-sm sm:text-base text-gray-500 font-bold">
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