import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFacetedRowModel,
  getFacetedUniqueValues,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columns } from "./config/columns";
import { tableData } from "./data";
import "./index.css";
import filter from "../public/filter.svg";
import Filter from "./components/Filter";

const GeneyxTable: React.FC = () => {
  const [hoveredHeader, setHoveredHeader] = useState<string | null>(null);
  const [clickedHeader, setClickedHeader] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeFilterColumn, setActiveFilterColumn] = useState<null | any>(
    null
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData(tableData);
  },[])

  const table = useReactTable({
    data,
    columns,
    getFacetedRowModel: getFacetedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnPinning: {
        left: ["location", "gene"],
      },
    },
  });

  const handleFilterClick = (event: React.MouseEvent, headerId: string) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setClickedHeader({
      id: headerId,
      x: rect.right,
      y: rect.bottom + window.scrollY,
    });
    setIsOpen(true);
  };

  return (
    <div className="p-4 relative">
      <div className="relative overflow-x-auto overflow-y-auto max-w-screen max-h-[80vh]">
        <table
          className="table-fixed border-separate border border-gray-200"
          style={{ width: table.getTotalSize() }}
        >
          <thead className="bg-custom-gray">
            {table.getHeaderGroups().map((headerGroup, groupIndex) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  let stickyClass = "";
                  if (header.column.id === "location") {
                    stickyClass = "sticky-col location";
                  } else if (header.column.id === "gene") {
                    stickyClass = "sticky-col gene";
                  }
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onMouseEnter={() => setHoveredHeader(header.id)}
                      onMouseLeave={() => setHoveredHeader(null)}
                      className={`border relative border-gray-200 max-w-fit px-4 py-2 text-center text-xs font-semibold ${stickyClass} ${
                        groupIndex === 0
                          ? "text-heading-blue"
                          : "text-subheading-blue"
                      }`}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {groupIndex > 0 && hoveredHeader === header.id && (
                            <span
                              className="absolute right-2 text-sm text-gray-500 cursor-pointer"
                              onClick={(e) => {
                                handleFilterClick(e, header.id);
                                setActiveFilterColumn(header.column);
                              }}
                            >
                              <img
                                width={18}
                                height={18}
                                src={filter}
                                alt="filter"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-gray-50">
                {row.getVisibleCells().map((cell) => {
                  let stickyClass = "";
                  if (cell.column.id === "location") {
                    stickyClass = "sticky-col location";
                  } else if (cell.column.id === "gene") {
                    stickyClass = "sticky-col gene";
                  }
                  return (
                    <td
                      key={cell.id}
                      className={`border border-gray-200 max-w-fit px-4 py-2 text-center text-xs ${stickyClass}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - Positioned under clicked header */}
      {isOpen && clickedHeader && (
        <Filter
          position={clickedHeader}
          onClose={() => setClickedHeader(null)}
          column={activeFilterColumn}
        />
      )}
    </div>
  );
};

export default GeneyxTable;
