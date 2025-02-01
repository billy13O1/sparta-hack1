
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      itemName: "Hamburger Meat",
      category: 'Meat',
      quantity: 1000,
      location: "Case Hall",
      
    },
    {
      itemName: "Hamburger Meat",
      category: 'Meat',
      quantity: 1000,
      location: "Case Hall",
      
    },
    {
      itemName: "Hamburger Meat",
      category: 'Meat',
      quantity: 1000,
      location: "Case Hall",
      
    },
    {
      itemName: "Hamburger Meat",
      category: 'Meat',
      quantity: 1000,
      location: "Case Hall",
      
    },
    {
      itemName: "Hamburger Meat",
      category: 'Meat',
      quantity: 1000,
      location: "Case Hall",
      
    },
    {
      itemName: "Hamburger Meat",
      category: 'Meat',
      quantity: 1000,
      location: "Case Hall",
      
    },
    {
      itemName: "Hamburger Meat",
      category: 'Meat',
      quantity: 1000,
      location: "Case Hall",
      
    },
  ]
}

export default  async function Home() {
  const data = await getData()
  return (
    <div className="container mx-auto p-5">
      <DataTable columns={columns} data={data} />
    </div>
    
  );
}
