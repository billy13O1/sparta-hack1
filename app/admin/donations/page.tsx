"use client"
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Home() {
  const tableData = [
    {itemName: "Feed My Starving Children", quantity: 1156, location: "East Lansing", time: "1-10-2025"},
    {itemName: "Red Cross", quantity: 4060, location: "Michigan", time: "1-20-2025"},
    {itemName: "MSU Student Food Bank", quantity: 980, location: "East Lansing", time: "1-31-2025"},
    {itemName: "Greater Lansing Food Bank", quantity: 3050, location: "Lansing", time: "1-20-2025"},
    {itemName: "Food Assistance", quantity: 3626, location: "Lansing", time: "1-5-2025"},
    {itemName: "Food Rescue US", quantity: 10980, location: "USA", time: "2-26-2025"},
    {itemName: "Greater Chicago Food Depository", quantity: 2980, location: "Chicago", time: "1-19-2025"},
  ];


  return (
    <div className="container mx-auto px-5 mt-[-15px] bg-black0B">
      <DataTable columns={columns} data={tableData} addRow={()=>{}} updateData={()=>{}} updateLocation={()=>{}} />
    </div>
    
  );
}
