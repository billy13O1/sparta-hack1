"use client";
import { useEffect, useRef, useState } from "react";
import { AreaChartStacked } from "../dashboard/components/area-chart";
import { getMetrics } from "@/lib/mongo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

export default function Home() {
  const [gptResponse, setGptResponse] = useState("");

  useEffect(() => {
    async function getGPTResponse() {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setGptResponse(data.reply);
      } catch (error) {
        console.error("Error fetching GPT response:", error);
        setGptResponse("Failed to load joke.");
      }
    }

    getGPTResponse();
  }, []);

  return (
    <div>
      <h1 className="ml-8 text-xl font-bold text-white">Reports Overview</h1>
      <div className="flex flex-row space-x-4 w-full">
        <div className="flex flex-row w-full gap-16 p-8 mt-[-20px]">
          <div className="w-1/2">
            {/* GPT Response Header */}
            <h2 className="text-white text-lg font-bold">GPT Joke:</h2>
            <p className="text-white text-md">{gptResponse}</p>
          </div>
          <div className="w-1/2">
            <AreaChartStacked
              title="Food Production vs. Food Unused"
              description="Insights based on food waste and consumption data."
              chartData={[]}
              keys={["Date", "Production", "Unused"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
