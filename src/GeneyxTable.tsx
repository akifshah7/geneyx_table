// todo: filters remaining
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { columns } from "./config/columns";
import { data } from "./data";
import "./index.css";

const GeneyxTable: React.FC = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnPinning: {
        left: ["location", "gene"],
      },
    },
  });

  return (
    <div className="p-4">
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
                      className={`border border-gray-200 max-w-fit px-4 py-2 text-center text-xs font-semibold ${stickyClass} ${
                        groupIndex === 0
                          ? "text-heading-blue"
                          : "text-subheading-blue"
                      }`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
    </div>
  );
};

export default GeneyxTable;
