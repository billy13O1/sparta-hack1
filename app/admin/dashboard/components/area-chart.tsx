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
    color: "purple",
    
  },
  mobile: {
    label: "Mobile",
    color: "cyan",
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
    <Card className="bg-color4">
      <CardHeader className="text-white">
        <CardTitle className="text-white">{title}</CardTitle>
        {/* <CardDescription>{description}</CardDescription> */}
      </CardHeader>
      <CardContent className="text-white">
        <ChartContainer config={chartConfig} className="text-white">
          <AreaChart
            accessibilityLayer
            data={chartData}
            // margin={{
            //   left: 6,
            //   right: 6,
            // }}
            style={{ overflow: 'visible' }}
            className="text-white"
          >
            
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={keys[0]}
              tickLine={false}
              axisLine={false}
              tickMargin={16}
              tickFormatter={(value) => value}
              
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
              className="text-white"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              dataKey={keys[1]}
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
            />
            <Area
              dataKey={keys[2]}
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
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
