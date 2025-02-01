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
  } from "@tanstack/react-table"
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

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  
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
      <div className="flex items-center py-4">
      <p className="whitespace-nowrap mr-10 font-bold">
        Item List
        </p>
        
        <div className="relative w-full">
      
      <Input
          placeholder="⌕ Search for item..."
          value={(table.getColumn("itemName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("itemName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        </div>

      </div>
      <div className="flex flex-row space-x-2 justify-end mb-[-34px]">
        <Button className="w-40">Add New Item</Button>
        <Button className="w-40">Import Data</Button>
        </div>
      <div className="rounded-md border mt-10">
        
        <h1 className="m-5 text-lg">All Items</h1>
        <hr></hr>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="text-center">
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
                    <TableCell key={cell.id } className="text-center">
                        
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
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

