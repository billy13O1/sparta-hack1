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
import { AreaChartLong, LinearChart } from "./components/linear-chart";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [consumptionData, setConsumptionData] = useState<
    { date: string; in: number; out: number }[]
  >([]);
  const [flowData, setFlowData] = useState<{ date: string; in: number }[]>([]);
  const [trafficData, setTrafficData] = useState<{ date: string; in: number }[]>([]);
  const [selectedWeek, setSelectedWeek] = useState("0");
  const [selectedLocation, setSelectedLocation] = useState("case");
  const [cleanData, setCleanData] = useState<string>("");
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekRanges = [
    [new Date(2025, 0, 1), new Date(2025, 0, 7)],
    [new Date(2025, 0, 8), new Date(2025, 0, 15)],
    [new Date(2025, 0, 16), new Date(2025, 0, 24)],
  ];
  const linkRef = useRef<null | HTMLLinkElement>(null);

  useEffect(() => {
    async function getConsumptionData() {
      console.log("getting data");
      const metrics = await getMetrics("MSU", selectedLocation);
      console.log("data got");

      if (!metrics) {
        console.error("Wrong data");
        return;
      }

      let flowCSV: string = metrics.flow.map((row: string[]) => row.join(",")).join("\n");
      flowCSV = "dateTime,amount\n" + flowCSV;
      let wasteCSV: string = metrics.waste.map((row: string[]) => row.join(",")).join("\n");
      wasteCSV = "dateTime,amount\n" + wasteCSV;
      let inputCSV: string = metrics.input.map((row: string[]) => row.join(",")).join("\n");
      inputCSV = "date,amount,type,category\n" + inputCSV;
      setCleanData(flowCSV+"\n"+wasteCSV+"\n"+inputCSV);

      const combinedInput: { [key: string]: number } = {};
      for (const input of metrics.input) {
        if (!combinedInput[input[0]]) {
          combinedInput[input[0]] = 0;
        }
        combinedInput[input[0]] += parseInt(input[1]);
      }

      const newConsumptionData: { date: string; in: number; out: number }[] = [];
      for (let i = 0; i < metrics.waste.length; ++i) {
        const dateString = metrics.waste[i][0];
        const [year, month, day] = dateString.split("-");
        const date = new Date(year, month-1, day);
        const inRange = date >= weekRanges[parseInt(selectedWeek)][0] && date <= weekRanges[parseInt(selectedWeek)][1];
        if (!inRange) {
          continue;
        }
        newConsumptionData.push({  
          Date: daysOfWeek[date.getDay()],
          Production: combinedInput[metrics.waste[i][0]],
          Unused: parseInt(metrics.waste[i][1]),
        });
      }

      const combinedFlow: { [key: string]: number } = {};
      for (const input of metrics.flow) {
        if (!combinedFlow[input[0].split(":")[0]]) {
          combinedFlow[input[0].split(":")[0]] = 0;
        }
        combinedFlow[input[0].split(":")[0]] += parseInt(input[1]);
      }
      
      const newFlowData: { date: string; in: number }[] = [];
      const seen = new Set();
      for (let i = 0; i < metrics.flow.length; ++i) {
        const dateString = metrics.flow[i][0].split(":")[0];
        if (seen.has(dateString)) {
          continue;
        }
        seen.add(dateString);
        const [year, month, day] = dateString.split("-");
        const date = new Date(year, month-1, day);
        const inRange = date >= weekRanges[parseInt(selectedWeek)][0] && date <= weekRanges[parseInt(selectedWeek)][1];
        if (!inRange) {
          continue;
        }
        newFlowData.push({
          Date: daysOfWeek[date.getDay()],
          Traffic: combinedFlow[metrics.flow[i][0].split(":")[0]],
        });
      }
      
      setConsumptionData(newConsumptionData);
      setFlowData(newFlowData);
      
      const newTrafficData: { date: string; in: number }[] = [];
      for (let i = 0; i < metrics.flow.length; ++i) {
        const dateString = metrics.flow[i][0].split(":")[0];
        const timeString = metrics.flow[i][0].split(":")[1];

        const [year, month, day] = dateString.split("-");
        const [hours, minutes] = timeString.split("-");
        const date = new Date(year, month-1, day, hours, minutes);
        console.log(day);
        if (day != 1) {
          continue;
        }
        newTrafficData.push({
          Hour: parseInt(hours) < 12 ? `${date.getHours().toString()}am` : `${date.getHours().toString()-12}pm`,
          Traffic: parseInt(metrics.flow[i][1]),
        });
      }
      console.log(newTrafficData)
      setTrafficData(newTrafficData);
    }

    getConsumptionData();
    
  }, [selectedWeek, selectedLocation]);

  // Update descriptions dynamically based on the selected week
  const weekDescriptions = {
    "2024-01-01-07": "Data from January 1st to January 7th, 2024",
    "2024-01-08-15": "Data from January 8th to January 15th, 2024",
    "2024-01-16-24": "Data from January 16th to January 24th, 2024",
  };

  const description = weekDescriptions[selectedWeek] || "Select a week to view data";

  return (
    <div>
      <h1 className="ml-8 text-xl font-bold text-white">Reports Overview</h1>

      {/* Select Inputs for Date and Location */}
      <div className="flex flex-row gap-4 ml-8 mt-2 text-gray-400 ">
        {/* Select Week */}
        <Select onValueChange={(value) => setSelectedWeek(value)}>
          <SelectTrigger className="w-[200px] bg-color4">
            <SelectValue className = "bg-color4 " placeholder="📅 Select Week" />
          </SelectTrigger>
          <SelectContent className="bg-color4">
            <SelectItem className = "text-white bg-color4" value="0">January 1-7, 2024</SelectItem>
            <SelectItem className = "text-white bg-color4" value="1">January 8-15, 2024</SelectItem>
            <SelectItem className = "text-white bg-color4" value="2">January 16-24, 2024</SelectItem>
          </SelectContent>
        </Select>

        {/* Select Location */}
        <Select onValueChange={(value) => setSelectedLocation(value)}>
          <SelectTrigger className="w-[200px] bg-color4">
            <SelectValue  className = "bg-color4 "placeholder="⚲ Select Location" />
          </SelectTrigger>
          <SelectContent className="bg-color4">
            <SelectItem className = "text-white bg-color4" value="case">Case Dining Hall</SelectItem>
            <SelectItem  className = "text-white bg-color4"value="shaw">Shaw Dining Hall</SelectItem>
            <SelectItem  className = "text-white bg-color4"value="brody">Brody Dining Hall</SelectItem>
            <SelectItem  className = "text-white bg-color4"value="synder">Synder Phillips Dining Hall</SelectItem>
          </SelectContent>
        </Select>
        <div className="ml-auto mr-8 bg-purple ">
          <Button className = "bg-purple`"onClick={() => {
            if (linkRef.current !== null) {
              linkRef.current.click();
            }
          }}>Export Data</Button>
          <div className="bg-purple">
          <a className="bg-purple" ref={linkRef} style={{display: "none"}} href={`data:text/plain;charset=utf-8, ${encodeURIComponent(cleanData)}`} download={"export.csv"}>Test</a>
          </div>
        </div>
      </div>

      <div className=" flex flex-row space-x-4 w-full">
        <div className="flex flex-row w-full gap-16 p-8 mt-[-20px]">
          <div className="w-1/2 ">
            <AreaChartStacked
              title="Food Production vs. Food Unused"
              description={description}
              chartData={consumptionData}
              keys={["Date", "Production", "Unused"]}
              
              
            />
            
          </div>
          <div className="w-1/2">
            <AreaChartStacked
              title="Traffic"
              description={description}
              chartData={flowData}
              keys={["Date", "Traffic"]}
            />
          </div>
        </div>
      </div>
      <div className="w-full p-8">
        <AreaChartLong
        />
      </div>
      <div className="flex justify-between gap-6 p-6">
        <div className="flex-1 max-w-xs">
          <Card className="bg-color4 p-6 h-[200px] flex flex-col justify-center items-center">
            <h1 className="text-gray-500 text-xl text-center">Average Output</h1>
            <h1 className="text-white text-4xl text-center">Hello</h1>
          </Card>
        </div>
        
        <div className="flex-1 max-w-xs">
          <Card className="bg-color4 p-6 h-[200px] flex flex-col justify-center items-center">
            <h1 className="text-gray-500 text-xl text-center">Average Output</h1>
            <h1 className="text-white text-4xl text-center">Hello</h1>
          </Card>
        </div>
        
        <div className="flex-1 max-w-xs">
          <Card className="bg-color4 p-6 h-[200px] flex flex-col justify-center items-center">
            <h1 className="text-gray-500 text-xl text-center">Average Output</h1>
            <h1 className="text-white text-4xl text-center">Hello</h1>
          </Card>
        </div>

      </div>
    </div>
  );
}
