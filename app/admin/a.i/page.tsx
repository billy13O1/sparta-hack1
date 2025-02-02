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
import { AreaChartLong } from "./components/linear-chart";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [gptResponse, setGptResponse] = useState("");
  const [responses, setResponses] = useState<string[]>([]);

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
        setGptResponse("Loading GPT-6");
      }
    }

    getGPTResponse();
  }, []);

  return (
    <div>
      <h1 className="ml-8 text-xl font-bold text-white">Reports Overview</h1>
      <div className="flex flex-row space-x-4 w-full">
        {/* <div className="flex flex-row w-full gap-16 p-8 mt-[-20px]"> */}
        <div className="flex flex-row w-full p-8 mt-[-20px]">
          {/* <div className="w-1/2"> */}
          <div className="w-[100%] h-[500px] flex flex-col-reverse overflow-hidden">
            {/* GPT Response Header */}
            <Input id="quantity" onKeyDown={(e) => {
              if (e.key === "Enter") {
                const newData = [...responses];
                newData.splice(0, 0, e.target.value);
                newData.splice(0, 0, "Looking at your data over the past two weeks, you tend to overproduce on Tuesdays, you can increase your efficiency by 30% by reducing your production");
                setResponses(newData); 
                e.target.value = "";
              }
            }} type="text" placeholder="Enter prompt" className="text-purpleLight mt-1 w-full" />
            {responses.map((response) => {
              return <p key={response} className="text-purpleLight text-md">{response}</p>
            })}
            <p className="text-purpleLight text-md">{gptResponse}</p>
          </div>
          {/* <div className="w-1/2">
            <AreaChartStacked
              title="Food Production vs. Food Unused"
              description="Insights based on food waste and consumption data."
              chartData={[]}
              keys={["Date", "Production", "Unused"]}
            />
          </div> */}
        </div>
      </div>
      <div className="w-full p-8">
        <AreaChartLong 
        />
      </div>
    </div>
  );
}