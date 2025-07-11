"use client";

import React from "react";
import Layout from "@/components/Layout";

export default function SettingsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-[#58595b]/10">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-[#58595b]">Settings</h1>
            <p className="text-lg text-[#58595b]/80 font-light">
              This page is currently under development.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
