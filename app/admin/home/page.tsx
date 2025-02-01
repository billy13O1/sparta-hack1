import { AreaChartStacked } from "../home/components/area-chart"
export default function Home() {
  return (
    <div>
      <h1 className="ml-2">Welcome to Blank Dining Hall</h1>
      <div className="ml-2 grid grid-cols-3 space-x-4">
        <AreaChartStacked/>
        <AreaChartStacked/>
        <AreaChartStacked/>
      </div>
    </div>
  );
}
