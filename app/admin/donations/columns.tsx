"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, PencilLine, Trash2Icon } from "lucide-react"
// import { MoreHorizontal } from "lucide-react"
// import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
export type Payment = {
  itemName: string
  category: string
  quantity: number
  location: string
  time: string
}

export const columns: ColumnDef<Payment>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //       <Checkbox
    //         checked={
    //           table.getIsAllPageRowsSelected() ||
    //           (table.getIsSomePageRowsSelected() && "indeterminate")
    //         }
    //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //         aria-label="Select all"
    //       />
    //     ),
    //     cell: ({ row }) => (
    //       <Checkbox
    //         checked={row.getIsSelected()}
    //         onCheckedChange={(value) => row.toggleSelected(!!value)}
    //         aria-label="Select row"
    //       />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    //   },
  {
    accessorKey: "itemName",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Item Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  // {
  //   accessorKey: "category",
  //   header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Category
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       )
  //     },
  // },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <div className="color-white">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Meals Requested
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("quantity"));
    
      // Format the amount with commas
      const formatted = new Intl.NumberFormat("en-US").format(amount);
      const formattedWithBrackets = `${formatted}`;
    
      return <div className="font-medium">{formattedWithBrackets}</div>;
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            
          >
            Location
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            
          >
            Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  }
]