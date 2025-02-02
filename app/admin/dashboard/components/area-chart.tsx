"use client"
// import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#F55",
    
  },
  mobile: {
    label: "Mobile",
    color: "#9FF",
  },
} satisfies ChartConfig

type AreaChartStackedProps = {
  title: string,
  description: string,
  keys: string[],
  chartData: {date: string, in: number, out: number}[] | {date: string, in: number}[]
}
export function AreaChartStacked({title, description, keys, chartData}: Readonly<AreaChartStackedProps>) {
  return (
    <Card className="bg-color4 border-0">
      <CardHeader className="text-purpleLight">
        <CardTitle className="text-purpleLight mx-5">{title}</CardTitle>
        {/* <CardDescription>{description}</CardDescription> */}
      </CardHeader>
      <CardContent className="text-purpleLight">
        <ChartContainer config={chartConfig} className="text-purpleLight">
          <AreaChart
            accessibilityLayer
            data={chartData}
            // margin={{
            //   left: 6,
            //   right: 6,
            // }}
            style={{ overflow: 'visible' }}
            className="text-purpleLight"
          >
            
            {/* <CartesianGrid vertical={false} className="text-purpleLight" /> */}
            <XAxis
              dataKey={keys[0]}
              tickLine={false}
              axisLine={false}
              tickMargin={16}
              tickFormatter={(value) => value}
              className="text-purpleLight"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
              className="text-purpleLight"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" className="text-purpleLight" />}
            />
            {/* <ChartLegend content={<ChartLegendContent className="text-purpleLight" />} /> */}
            <Area
              dataKey={keys[1]}
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              className="text-purpleLight"
            />
            <Area
              dataKey={keys[2]}
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              className="text-purpleLight"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - February 2025
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  )
}
