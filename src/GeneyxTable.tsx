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
// import { tableData } from "./data";
import "./index.css";
import filter from "../public/filter.svg";
import Filter from "./components/Filter";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import right from "../public/chevron-right.svg";
import left from "../public/chevron-left.svg";
import { getDefaultColumnVisibility } from "./utils/columnVisibility";
import { getTableData } from "./utils/services";

const GeneyxTable: React.FC = () => {
  const [hoveredHeader, setHoveredHeader] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
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
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const [columnVisibility, setColumnVisibility] = useState(
    getDefaultColumnVisibility(columns)
  );
  const [expandedHeaders, setExpandedHeaders] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const table = useReactTable({
    data,
    columns,
    getFacetedRowModel: getFacetedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      columnFilters,
      columnVisibility,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnPinning: {
        left: ["select", "location", "gene"],
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

  const handleRowSelection = (rowId: string) => {
    setSelectedRows((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(rowId)) {
        newSelection.delete(rowId);
      } else {
        if (newSelection.size < 5) {
          newSelection.add(rowId);
        } else {
          alert("You can only select up to 5 rows.");
        }
      }
      return newSelection;
    });
  };

  const generateReport = () => {
    if (selectedRows.size === 0) {
      alert("No rows selected for the report.");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add logo
    const logo = "vgenomics logo.JPG"; // Ensure the logo file is accessible
    doc.addImage(logo, "JPEG", 14, 10, 50, 20);

    // Add report heading with blue background
    doc.setFillColor(0, 0, 255); // Blue background
    doc.rect(0, 40, pageWidth, 10, "F"); // Blue rectangle
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255); // White text
    doc.text("Whole Exome Sequencing Report", pageWidth / 2, 45, {
      align: "center",
    });

    // Reset text color for the rest of the document
    doc.setTextColor(0, 0, 0); // Black text

    // Add patient information table
    doc.setFontSize(12);
    doc.setTextColor(255, 165, 0); // Orange text
    doc.text("Patient Information", 14, 60);
    doc.setTextColor(0, 0, 0); // Black text
    autoTable(doc, {
      startY: 65,
      head: [["Name", "Age/DOB", "Gender", "Specimen Type"]],
      body: [["XXXX", "XXXX", "XXXX", "Blood"]],
      theme: "grid",
    });

    // Add Clinical Phenotype section
    doc.setFontSize(12);
    doc.setTextColor(255, 165, 0); // Orange text
    doc.text("Clinical Phenotype", 14, 95);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(
      "Patient presented with, waddling gait, walking on the toes, large calf muscles, learning disabilities. Evaluated for related genes.",
      14,
      105,
      { maxWidth: 180 }
    );

    // Add Variant Details section
    doc.setFontSize(12);
    doc.setTextColor(255, 165, 0); // Orange text
    doc.text("Variant Details", 14, 125);
    let finalY = 130;
    autoTable(doc, {
      startY: finalY,
      head: [
        [
          "Gene",
          "Genomic Position",
          "cDNA Change",
          "Zygosity",
          "Variant Consequence",
          "Associated Disorder",
        ],
      ],
      body: Array.from(selectedRows).map((rowId) => {
        const row = table.getRowModel().rows.find((r) => r.id === rowId);
        return row ? row.getVisibleCells().map((cell) => cell.getValue()) : [];
      }),
      theme: "grid",
      didDrawPage: (data) => (finalY = data.cursor.y),
    });

    // Add Therapy Details section
    doc.setFontSize(12);
    doc.setTextColor(255, 165, 0); // Orange text
    doc.text("Therapy Details", 14, finalY + 10);
    autoTable(doc, {
      startY: finalY + 15,
      head: [["Gene", "Variants", "Therapy", "Disease"]],
      body: [
        [
          "DMD",
          "c.2791G>T",
          "Golodirsen, Eteplirsen",
          "Duchenne muscular dystrophy",
        ],
      ],
      theme: "grid",
      didDrawPage: (data) => (finalY = data.cursor.y),
    });

    // Add Recommendations section
    doc.setFontSize(12);
    doc.setTextColor(255, 165, 0); // Orange text
    doc.text("Recommendations", 14, finalY + 10);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(
      "Validation of the variant by Sanger sequencing is recommended to rule out false positives.",
      14,
      finalY + 20,
      { maxWidth: 180 }
    );

    // Add Limitations section
    doc.setFontSize(12);
    doc.setTextColor(255, 165, 0); // Orange text
    doc.text("Limitations", 14, finalY + 40);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(
      "This Exome sequence test is designed to evaluate SNV and Indels variants within coding region; however, this technology is only able to sequence 90 - 95% of the human reference to the requisite 10-fold coverage needed for reliable detection of heterozygous variants. Next generation sequencing technologies (NGS), including whole exome analysis, have a false positive rate of 5-10%. Additionally, certain types of genetic abnormalities are difficult to identify in sequencing data and have not been validated for clinical use including insertions, deletions, copy number alterations, long repetitive sequences, triplet repeat expansions, chromosomal rearrangements, polyploidy, repetitive regions including mono-, di- and tri-nucleotide repeats, GX rich regions, intronic variants inside and outside the splice-site and epigenetic effects. Large insertions, deletions, duplications, inversions and complex rearrangements cannot be characterized accurately by NGS as it uses short-read sequencing data. Only variations in genes potentially related to the patient’s phenotype are reported. Misinterpretation of results may occur, if the information provided is inaccurate or incomplete. Rare polymorphisms may lead to false negative or positive results. This does not imply that reported variants can always explain all symptoms of the patient. More clinical details assist in more precise evaluation. If results obtained do not match with the clinical findings given, additional testing should be considered. Re-filtering based on additional clinical information can be done when required even after the final report has been issued. Few genes are not completely covered in our whole genome panel and thus, there might be chances of missing few mutations.",
      14,
      finalY + 50,
      { maxWidth: 180 }
    );

    // Add Additional Information section
    doc.setFontSize(12);
    doc.setTextColor(255, 165, 0); // Orange text
    doc.text("Additional Information", 14, finalY + 120);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(
      "Incidental gene analysis and reporting will be done after receiving the consent from the parent/guardian.",
      14,
      finalY + 130,
      { maxWidth: 180 }
    );

    // Add Disclaimer section
    doc.setFontSize(12);
    doc.setTextColor(255, 165, 0); // Orange text
    doc.text("Disclaimer", 14, finalY + 150);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(
      "It is presumed that the specimen used to perform the test belongs to the patient specified above, such verification having been carried out at the collection level of sample. Variants believed to be benign based on medical literature, or with population frequencies greater than or equal to 5%, or resulting in synonymous amino acid changes, or occurring in 5’ or 3’ untranslated regions are generally not reported. It has not been cleared or approved by the U.S. Food and Drug Administration (FDA) for diagnostic purposes. Hence, test is recommended for research use only. This is a screening test and variants if found, need to be confirmed by Sanger sequencing, as it might be associated with having false positive/ false negative results.",
      14,
      finalY + 160,
      { maxWidth: 180 }
    );

    // Add References section
    doc.setFontSize(12);
    doc.setTextColor(255, 165, 0); // Orange text
    doc.text("References", 14, finalY + 200);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(
      "https://www.genecards.org/cgi-bin/carddisp.pl?gene=BLK\nhttps://www.ncbi.nlm.nih.gov/snp/rs980105504\nhttps://www.malacards.org/card/maturity_onset_diabetes_of_the_young_type_11\nhttp://omim.org/entry/613375",
      14,
      finalY + 210,
      { maxWidth: 180 }
    );

    // Save the PDF
    doc.save("Geneyx_Report.pdf");
  };

  const getData = async () => {
    await getTableData("../public/vgenomics_csv_final.csv", setTableData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-4 relative">
      <div className="mb-2 flex justify-end">
        <button
          onClick={generateReport}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1 px-3 rounded border border-gray-300"
        >
          Generate Report
        </button>
      </div>

      <div className="relative overflow-x-auto overflow-y-auto max-w-screen max-h-[80vh]">
        <table
          className="table-fixed border-separate border border-gray-200"
          style={{ width: table.getTotalSize() }}
        >
          <thead className="bg-custom-gray">
            {table.getHeaderGroups().map((headerGroup, groupIndex) => (
              <tr key={headerGroup.id}>
                <th className="border border-gray-300 px-2 w-10 text-center"></th>
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
                      className={`border relative border-gray-300 max-w-fit px-4 py-2 text-center text-xs font-semibold ${stickyClass} ${
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
                          {/* For subheaders, show filter icon on hover as before */}
                          {groupIndex === 0 && (
                            <span
                              className="absolute right-2 text-sm text-gray-500 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                const currentExpanded =
                                  expandedHeaders[header.column.id] || false;
                                setExpandedHeaders((prev) => ({
                                  ...prev,
                                  [header.column.id]: !currentExpanded,
                                }));

                                // Get all leaf columns for this top-level header
                                const leafColumns =
                                  header.column.getLeafColumns();
                                setColumnVisibility((prev) => {
                                  const newVisibility = { ...prev };
                                  leafColumns.forEach((leaf) => {
                                    if (!currentExpanded) {
                                      // Expanding: force all subheaders to visible
                                      newVisibility[leaf.id] = true;
                                    } else {
                                      newVisibility[leaf.id] =
                                        leaf.columnDef.meta
                                          ?.defaultVisibility === false
                                          ? false
                                          : true;
                                    }
                                  });
                                  return newVisibility;
                                });
                              }}
                            >
                              <img
                                width={18}
                                height={18}
                                src={
                                  expandedHeaders[header.column.id]
                                    ? left
                                    : right
                                }
                                alt="toggle columns"
                              />
                            </span>
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
                <td className="borde-none px-2 w-10 text-center sticky left-0 z-[99]">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => handleRowSelection(row.id)}
                  />
                </td>
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
                      className={`border border-gray-200 max-w-fit px-4 py-2 text-center text-xs ${stickyClass} ${
                        cell.id.includes("genomics-spliceregion") ||
                        cell.id.includes("genomics-lovd") ||
                        cell.id.includes("genomics-snps") ||
                        cell.id.includes("genomics-hgvsc") ||
                        cell.id.includes("genomics-hgvsp") ||
                        cell.id.includes("clinical-phenotypes") ||
                        cell.id.includes("clinical-clinvarreview") ||
                        cell.id.includes("clinical-pubmed") ||
                        cell.id.includes("effect-mutationtasterscore") ||
                        cell.id.includes("effect-adascore") ||
                        cell.id.includes("effect-alphamissensescore") ||
                        cell.id.includes("effect-sift4gscore") ||
                        cell.id.includes("effect-revelscore") ||
                        cell.id.includes("frequency-exacsasaf") ||
                        cell.id.includes("frequency-esp6500eaaf") ||
                        cell.id.includes("frequency-1000gp3sasaf")
                          ? "truncate"
                          : ""
                      }`}
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
