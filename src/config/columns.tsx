import { ColumnDef } from "@tanstack/react-table";
import {
  filterFunctionForNumbers,
  filterFunctionForText,
} from "../utils/filters";

export interface DataType {
  location: string;
  gene: string;
  genomicAndGeneticData: {
    REF: string;
    ALT: string;
    AA: string;
    ZYG: string;
  };
  ACMG: {
    DOM: string;
    REC: string;
  };
  variantCallingQR: {
    "Q&R": string;
    DP2: number;
    "Alt(%)": string;
  };
  clinicalEvidence: {
    Pheno: string;
    matchedPhenotypes: string;
    CLINVAR: string;
    OMIM: string;
    "OMIM Inheritance": string;
    LitVar2: string;
  };
  inHouse: {
    V: string;
    G: string;
    "AF%": string;
  };
  effectAndPrediction: {
    EFFECT: string;
    Sev: string;
    "CADD(PHRED)": number;
    "Splice-AI": string;
  };
  frequency: {
    "Max AF(%)": string;
    "GNEv4 AF(%)": string;
    "GNGv4 AF(%)": string;
  };
}

// todo: need to add more styles to columns
export const columns: ColumnDef<DataType>[] = [
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
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
        },
      },
      {
        header: "ALT",
        accessorKey: "genomicAndGeneticData.ALT",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
        },
      },
      {
        header: "AA",
        accessorKey: "genomicAndGeneticData.AA",
        cell: (info) => (
          <span className="text-heading-blue">{info.getValue<string>()}</span>
        ),
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
        },
      },
      {
        header: "ZYG",
        accessorKey: "genomicAndGeneticData.ZYG",
        cell: (info) => {
          const value = info.getValue<string>();
          return (
            <span className={value === "HET" ? "text-black" : "text-red-600"}>
              {value}
            </span>
          );
        },
        meta: {
          filterVariant: "checkbox",
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
          const value = info.getValue<string>();
          if (!value) return null;
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
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "REC",
        accessorKey: "ACMG.REC",
        cell: (info) => {
          const value = info.getValue<string>();
          if (!value) return null;
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
        meta: {
          filterVariant: "checkbox",
        },
      },
    ],
  },
  {
    header: "Variant Calling Q&R",
    columns: [
      {
        header: "Q&R",
        accessorKey: "variantCallingQR.Q&R",
        meta: {
          filterVariant: "checkbox",
        },
      },
      { header: "DP2", accessorKey: "variantCallingQR.DP2" },
      {
        header: "Alt(%)",
        accessorKey: "variantCallingQR.Alt(%)",
        filterFn: filterFunctionForNumbers,
      },
    ],
  },
  {
    header: "Clinical Evidence",
    columns: [
      { header: "Pheno", accessorKey: "clinicalEvidence.Pheno" },
      {
        header: "Matched Phenotypes",
        accessorKey: "clinicalEvidence.matchedPhenotypes",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "CLINVAR",
        accessorKey: "clinicalEvidence.CLINVAR",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "OMIM",
        accessorKey: "clinicalEvidence.OMIM",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "OMIM Inheritance",
        accessorKey: "clinicalEvidence.OMIM Inheritance",
        meta: {
          filterVariant: "checkbox",
        },
      },
      { header: "LitVar2", accessorKey: "clinicalEvidence.LitVar2" },
    ],
  },
  {
    header: "In House",
    columns: [
      {
        header: "V",
        accessorKey: "inHouse.V",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "G",
        accessorKey: "inHouse.G",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "AF%",
        accessorKey: "inHouse.AF%",
        filterFn: filterFunctionForNumbers,
      },
    ],
  },
  {
    header: "Effect & Prediction",
    columns: [
      {
        header: "EFFECT",
        accessorKey: "effectAndPrediction.EFFECT",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "Sev",
        accessorKey: "effectAndPrediction.Sev",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "CADD(PHRED)",
        accessorKey: "effectAndPrediction.CADD(PHRED)",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "Splice-AI",
        accessorKey: "effectAndPrediction.Splice-AI",
        filterFn: filterFunctionForNumbers,
      },
    ],
  },
  {
    header: "Frequency",
    columns: [
      { header: "Max AF(%)", accessorKey: "frequency.Max AF(%)", filterFn: filterFunctionForNumbers },
      {
        header: "GNEv4 AF(%)",
        accessorKey: "frequency.GNEv4 AF(%)",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "GNGv4 AF(%)",
        accessorKey: "frequency.GNGv4 AF(%)",
        filterFn: filterFunctionForNumbers,
      },
    ],
  },
];
