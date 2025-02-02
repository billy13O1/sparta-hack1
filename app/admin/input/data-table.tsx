"use client"

import { Button } from "@/components/ui/button"
import * as React from "react"
import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { DataTablePagination } from "./DataTablePagination"
import ImportButton from "@/components/ImportButton"

type DataTableProps<TData, TValue> = {
  columns: TData, 
  data: TValue,
  addRow: (itemName: string, quantity: string, location: string, category: string, time: string) => void,
  updateData: () => void,
  updateLocation: () => void,
}
export function DataTable<TData, TValue>({ columns, data, addRow, updateData, updateLocation }: Readonly<DataTableProps<TData, TValue>>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedLocation, setSelectedLocation] = React.useState<string>("case");
  
  React.useEffect(() => {
    updateLocation(selectedLocation);
  }, [selectedLocation])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  })

  return (
    <div>
      <div className="flex items-center">
      <p className="whitespace-nowrap mr-10 text-[20px] text-white font-semibold">
        Item List
        </p>
        
        <div className="relative w-full">
      
      <Input
          placeholder="⌕ Search for item..."
          value={(table.getColumn("itemName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("itemName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-purpleLight placeholder-purpleLight bg-black12 text-[12px] font-medium"
          style={{border: 0}}
        />
        </div>

      </div>
      <div className="flex flex-row space-x-2 justify-end mb-[-70px] mt-7">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-40 bg-purple1">Add New Item</Button>
        </DialogTrigger>
        <DialogContent className="p-6 bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">Input Fields</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Please fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="item-name" className="block text-sm font-medium text-gray-700">
                Item Name
              </label>
              <Input id="item-name" placeholder="Enter item name" className="mt-1 w-full" />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <Input id="category" placeholder="Enter category" className="mt-1 w-full" />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <Input id="quantity" type="number" placeholder="Enter quantity" className="mt-1 w-full" />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <Input id="location" placeholder="Enter location" className="mt-1 w-full" />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <Input
                id="time"
                type="time"
                className="mt-1 w-full"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button
              className="bg-red-600 text-white"
              onClick={() => addRow("Z", "100", selectedLocation, "idk", "now")}
            >
              Confirm
            </Button>
            <Button
              className="bg-gray-400 text-black"
              onClick={() => document.activeElement.blur()}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
        <ImportButton updateData={updateData} location={selectedLocation} />
        
        </div>
      <div className="rounded-md mt-10">
        <div className="flex flex-row gap-4 ml-8 text-gray-400">
          <h1 className="m-1 text-[16px] font-medium text-white">All Items</h1>
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
        </div>

        {/* <hr className="border-purpleLight"></hr> */}
        <Table>
          <TableHeader className="group/item">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className=" text-white font-medium text-[10px] text-left group-hover/item:bg-black12">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map(cell => (
                    <TableCell
                        key={cell.id}
                        className={`px-8 py-4 text-left font-medium text-[12px] bg-black12 ${cell.column.id === "itemName" ? "text-white" : "text-purpleLight"}`}
                    >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-white">
                    No results.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
      </div>

      {/* Pagination Component */}
      
      <DataTablePagination table={table} />
    </div>
  )
}

