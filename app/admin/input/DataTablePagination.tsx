"use client";

import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="flex items-center justify-between px-2 py-4">
      {/* Left Side - Showing Row Range */}
      <div className="text-[14px] text-muted-foreground text-purpleLight">
        {totalRows > 0 ? `${startRow} - ${endRow} of ${totalRows}` : "No data"}
      </div>

      {/* Right Side - Pagination Controls */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2 text-purpleLight">
          <p className="text-[14px] font-medium text-purpleLight">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px] bg-black12">
              <SelectValue placeholder={pageSize} className="text-purpleLight bg-black12"/>
            </SelectTrigger>
            <SelectContent side="top"className="bg-black12" >
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`} className="bg-black12 text-purpleLight">
                  {size}
                </SelectItem >
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2 text-purpleLight"> 
          <Button
            variant="outline"
            className="h-8 w-8 p-0 bg-black12 border-purpleLight hover:bg-slate-600"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            
            <ChevronLeft />
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0 bg-black12 border-purpleLight hover:bg-slate-600"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
