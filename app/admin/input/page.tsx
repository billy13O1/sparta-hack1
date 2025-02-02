"use client"
import { useEffect, useState } from "react";
import { Payment, columns } from "./columns"
import { ArrowUpDown, PencilLine, Trash2Icon } from "lucide-react"
import { DataTable } from "./data-table"
import { getMetrics } from "@/lib/mongo";
import { LOCATION_NAME_MAP } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [tableData, setTableData] = useState<{[key: string]: string}[]>([]);
  const [tableColumns, setTableColumns] = useState(columns);
  const [update, setUpdate] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("case");

  const updateData = () => {
    setUpdate(update+1);
  }

  useEffect(() => {
    console.log(selectedLocation);
    async function getTableData() {
      const newData: {[key: string]: string}[] = [];
      const diningData = await getMetrics("MSU", selectedLocation);
      if (diningData === undefined) {
        return;
      }
      for (const data of diningData.input) {
        newData.push({itemName: data[2], quantity: data[1], location: LOCATION_NAME_MAP[selectedLocation], category: data[3], time: data[0]});
      }
      console.log("Updating", newData[0], selectedLocation);
      setTableData([...newData]);
    }
    getTableData();
  }, [update, selectedLocation]);

  // useEffect(() => {
  //   const newTableColumns = [...tableColumns];
  //   newTableColumns.push({
  //     id: "actions",
  //     cell: (context) => {
  //       return (
  //         <div>
  //         {/* <Button className= "w-min" variant="ghost"><PencilLine></PencilLine></Button> */}
          
  //         <Button className= "w-min" variant="ghost" onClick={() => {
  //           console.log(context.row.index);
  //         }}><Trash2Icon></Trash2Icon>
  //         </Button>
  //         </div>
  //       )
  //     },
  //     }
  //   );
  //   setTableColumns(newTableColumns);
  // }, []);
  
  const addRow = (itemName: string, quantity: string, location: string, category: string, time: string) => {
    const newData: {[key: string]: string}[] = [...tableData];
    newData.push({itemName, quantity, location, category, time});
    setTableData(newData);
  }

  return (
    <div className="container mx-auto px-5 mt-[-15px] bg-black0B">
      <DataTable columns={tableColumns} data={tableData} addRow={addRow} updateData={updateData} updateLocation={(location) => {
        setSelectedLocation(location);
      }} />
      {/* <DataTable columns={columns} data={tableData} addRow={addRow} /> */}
    </div>
    
  );
}
