"use client"
import { useEffect, useState } from "react";
import { AreaChartStacked } from "../home/components/area-chart"
import { getMetrics } from "@/lib/mongo";
export default function Home() {
  const [consumptionData, setConsumptionData] = useState<{date: string, in: number, out: number}[]>([]);
  const [flowData, setFlowData] = useState<{date: string, in: number}[]>([]);
  
  useEffect(() => {
    async function getConsumptionData() {
      console.log("getting data");
      const metrics = await getMetrics("MSU", "case");
      console.log("data got");
      console.log(metrics);
      if (!metrics) {
        console.error("Wong data")
        return;
      }
      const combinedInput: {[key: string]: number} = {};
      for (const input of metrics.input) {
        if (!(Object.keys(combinedInput).includes(input[0]))) {
          combinedInput[input[0]] = 0;
        }
        combinedInput[input[0]] += parseInt(input[1])
      }

      const newConsumptionData: {date: string, in: number, out: number}[] = [];
      for (let i = 0; i < metrics.waste.length && i < 7; ++i) {
        newConsumptionData.push({date: metrics.waste[i][0], in: combinedInput[metrics.waste[i][0]], out: parseInt(metrics.waste[i][1])})
      }
      const newFlowData: {date: string, in: number}[] = [];
      for (let i = 0; i < metrics.flow.length && i < 7; ++i) {
        newFlowData.push({date: metrics.flow[i][0], in: parseInt(metrics.flow[i][1])});
      }

      setConsumptionData(newConsumptionData);
      setFlowData(newFlowData);
    }
    getConsumptionData();
  }, []);

  return (
    <div>
      <h1 className="m-2">Welcome to Case Dining Hall</h1>
      <div className="ml-2 flex flex-row space-x-4">
        <div className="flex flex-row w-full mx-5">
          <AreaChartStacked title="Input / Output" description="Data from January 1st to January 7th" chartData={consumptionData}/>
          <div className="mx-2"></div>
          <AreaChartStacked title="Traffic" description="Data from January 1st" chartData={flowData}/>
        </div>
      </div>
    </div>
  );
}
