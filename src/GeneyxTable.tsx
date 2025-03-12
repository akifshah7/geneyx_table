import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { data } from "./data";
import "./index.css";

const GeneyxTable: React.FC = () => {
  const columns = [
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Gene",
      accessorKey: "gene",
    },
    {
      header: "Genomic & Genetic Data",
      columns: [
        {
          header: "REF",
          accessorKey: "genomicAndGeneticData.REF",
        },
        {
          header: "ALT",
          accessorKey: "genomicAndGeneticData.ALT",
        },
        {
          header: "AA",
          accessorKey: "genomicAndGeneticData.AA",
          cell: (info) => {
            return <span className="text-heading-blue">{info.getValue()}</span>;
          },
        },
        {
          header: "ZYG",
          accessorKey: "genomicAndGeneticData.ZYG",
          cell: (info) => {
            const value = info.getValue();
            return (
              <span className={value === "HET" ? "text-black" : "text-red-600"}>
                {value}
              </span>
            );
          },
        },
      ],
    },
    {
      header: "ACMG",
      columns: [
        {
          header: "DOM",
          accessorKey: "ACMG.DOM",
          cell: (info) => {
            const value = info.getValue();
            if (!value) {
              return null;
            }
            return (
              <span
                className={`${
                  value === "LP" ? "bg-custom-pink" : "bg-row-gray"
                } w-8 h-8 px-2 rounded-sm text-white`}
              >
                {value}
              </span>
            );
          },
        },

        {
          header: "REC",
          accessorKey: "ACMG.REC",
          cell: (info) => {
            const value = info.getValue();
            if (!value) {
              return null;
            }
            return (
              <span
                className={`${
                  value === "LP" ? "bg-custom-pink" : "bg-row-gray"
                } w-8 h-8 px-2 rounded-sm text-white`}
              >
                {value}
              </span>
            );
          },
        },
      ],
    },
    {
      header: "Variant Calling Q&R",
      columns: [
        { header: "Q&R", accessorKey: "variantCallingQR.Q&R" },
        { header: "DP2", accessorKey: "variantCallingQR.DP2" },
        { header: "Alt(%)", accessorKey: "variantCallingQR.Alt(%)" },
      ],
    },
    {
      header: "Clinical Evidence",
      columns: [
        { header: "Pheno", accessorKey: "clinicalEvidence.Pheno" },
        {
          header: "Matched Phenotypes",
          accessorKey: "clinicalEvidence.matchedPhenotypes",
        },
        { header: "CLINVAR", accessorKey: "clinicalEvidence.CLINVAR" },
        { header: "OMIM", accessorKey: "clinicalEvidence.OMIM" },
        {
          header: "OMIM Inheritance",
          accessorKey: "clinicalEvidence.OMIM Inheritance",
        },
        { header: "LitVar2", accessorKey: "clinicalEvidence.LitVar2" },
      ],
    },
    {
      header: "In House",
      columns: [
        { header: "V", accessorKey: "inHouse.V" },
        { header: "G", accessorKey: "inHouse.G" },
        { header: "AF%", accessorKey: "inHouse.AF%" },
      ],
    },
    {
      header: "Effect & Prediction",
      columns: [
        { header: "EFFECT", accessorKey: "effectAndPrediction.EFFECT" },
        { header: "Sev", accessorKey: "effectAndPrediction.Sev" },
        {
          header: "CADD(PHRED)",
          accessorKey: "effectAndPrediction.CADD(PHRED)",
        },
        { header: "Splice-AI", accessorKey: "effectAndPrediction.Splice-AI" },
      ],
    },
    {
      header: "Frequency",
      columns: [
        { header: "Max AF(%)", accessorKey: "frequency.Max AF(%)" },
        { header: "GNEv4 AF(%)", accessorKey: "frequency.GNEv4 AF(%)" },
        { header: "GNGv4 AF(%)", accessorKey: "frequency.GNGv4 AF(%)" },
      ],
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Pin the first two columns (their IDs should match your accessorKeys)
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
                  // Add a class to the header if it's one of the first two columns
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
