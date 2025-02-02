"use client";
import { useEffect, useState } from "react";
import { AreaChartStacked } from "../home/components/area-chart";
import { getMetrics } from "@/lib/mongo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LinearChart } from "./components/linear-chart";

export default function Home() {
  const [consumptionData, setConsumptionData] = useState<
    { date: string; in: number; out: number }[]
  >([]);
  const [flowData, setFlowData] = useState<{ date: string; in: number }[]>([]);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  useEffect(() => {
    async function getConsumptionData() {
      console.log("getting data");
      const metrics = await getMetrics("MSU", "case");
      console.log("data got", metrics);

      if (!metrics) {
        console.error("Wrong data");
        return;
      }
      
      const combinedInput: { [key: string]: number } = {};
      for (const input of metrics.input) {
        if (!combinedInput[input[0]]) {
          combinedInput[input[0]] = 0;
        }
        combinedInput[input[0]] += parseInt(input[1]);
      }

      const newConsumptionData: { date: string; in: number; out: number }[] =
        [];
      for (let i = 0; i < metrics.waste.length && i < 7; ++i) {
        console.log(daysOfWeek[i])
        newConsumptionData.push({
          
          date: daysOfWeek[i],
          in: combinedInput[metrics.waste[i][0]],
          out: parseInt(metrics.waste[i][1]),
        });
      }

      const newFlowData: { date: string; in: number }[] = [];
      for (let i = 0; i < metrics.flow.length && i < 7; ++i) {
        newFlowData.push({
          date: daysOfWeek[i],
          in: parseInt(metrics.flow[i][1]),
        });
      }

      setConsumptionData(newConsumptionData);
      setFlowData(newFlowData);
    }

    getConsumptionData();
  }, []);

  // Update descriptions dynamically based on the selected week
  const weekDescriptions = {
    "2024-01-01-07": "Data from January 1st to January 7th, 2024",
    "2024-01-08-15": "Data from January 8th to January 15th, 2024",
    "2024-01-16-24": "Data from January 16th to January 24th, 2024",
  };

  const description = weekDescriptions[selectedWeek] || "Select a week to view data";
  console.log(consumptionData)
  console.log(flowData)
  return (
    <div>
      <h1 className="ml-8 text-xl font-bold">Reports Overview</h1>

      {/* Select Inputs for Date and Location */}
      <div className="flex flex-row gap-4 ml-8 mt-2">
        {/* Select Week */}
        <Select onValueChange={(value) => setSelectedWeek(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="📅 Select Week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024-01-01-07">January 1-7, 2024</SelectItem>
            <SelectItem value="2024-01-08-15">January 8-15, 2024</SelectItem>
            <SelectItem value="2024-01-16-24">January 16-24, 2024</SelectItem>
          </SelectContent>
        </Select>

        {/* Select Location */}
        <Select onValueChange={(value) => setSelectedLocation(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="⚲ Select Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="case">Case Dining Hall</SelectItem>
            <SelectItem value="shaw">Shaw Dining Hall</SelectItem>
            <SelectItem value="brody">Brody Dining Hall</SelectItem>
            <SelectItem value="synder">Synder Phillips Dining Hall</SelectItem>
          </SelectContent>
        </Select>
        <div className="ml-auto mr-8">
          <Button>Export Data</Button>
        </div>
      </div>

      <div className=" flex flex-row space-x-4 w-full">
        <div className="flex flex-row w-full gap-16 p-8 mt-[-20px]">
          <div className="w-1/2 h-[400px]">
            <AreaChartStacked
              title="Food Production vs. Food Unused"
              description={description}
              chartData={consumptionData}
              
            />
            
          </div>
          <div className="w-1/2 h-[400px]">
            <AreaChartStacked
              title="Traffic"
              description={description}
              chartData={flowData}
            />
          </div>
        </div>
      </div>
      <div className="h-10">
      <div className="w-full">
        <LinearChart
          title="Traffic"
          description={description}
          chartData={flowData}
        />
      </div>
      </div>
    </div>
  );
}
