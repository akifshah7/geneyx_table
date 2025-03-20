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
export const columns: ColumnDef<DataType,any>[] = [
  {
    header: "Location",
    id: "location",
    accessorKey: "location",
    filterFn: filterFunctionForText,
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: "Gene",
    accessorKey: "gene",
    filterFn: filterFunctionForText,
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: "Genomic & Genetic Data",
    columns: [
      {
        header: "REF",
        accessorKey: "genomicAndGeneticData.REF",
        id: 'ref',
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
        },
      },
      {
        header: "ALT",
        accessorKey: "genomicAndGeneticData.ALT",
        id: "alt",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
        },
      },
      {
        header: "AA",
        accessorKey: "genomicAndGeneticData.AA",
        id: "aa",
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
        id: "zyg",
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
      {
        header: "Codon",
        id: "codon",
        accessorKey: "genomicAndGeneticData.codon",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false
        },
      },
      {
        header: "SNS/RSID",
        id: "sns",
        accessorKey: "genomicAndGeneticData.sns/rsid",
        cell: (info) => (
          <div className="text-xs truncate ...">{info.getValue()}</div>
        ),
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false
        },
      },
    ],
  },
  {
    header: "ACMG",
    columns: [
      {
        header: "ACMG CLASSIFICATION",
        id: "acmgClassification",
        accessorKey: "ACMG.acmgClassification",
        cell: (info) => {
          const value = info.getValue<string>();
          if (!value) return null;
          return (
            <div
            >
              {value}
            </div>
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
        header: "IMPACT",
        accessorKey: "variantCallingQR.impact",
        meta: {
          filterVariant: "checkbox",
        },
      },
      { header: "DP", accessorKey: "variantCallingQR.DP" },
      {
        header: "GQ",
        accessorKey: "variantCallingQR.GQ",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "PL",
        id: "pl",
        accessorKey: "variantCallingQR.PL",
        filterFn: filterFunctionForNumbers,
        meta: {
          defaultVisibility: false,
        },
      },
      {
        header: "QUAL",
        id: "qual",
        accessorKey: "variantCallingQR.QUAL",
        filterFn: filterFunctionForNumbers,
        meta: {
          defaultVisibility: false,
        },
      },
      {
        header: "FILTER",
        id: "filter",
        accessorKey: "variantCallingQR.FILTER",
        filterFn: filterFunctionForNumbers,
        meta: {
          defaultVisibility: false,
        },
      },
    ],
  },
  {
    header: "Clinical Evidence",
    columns: [
      { header: "Pheno", accessorKey: "clinicalEvidence.Pheno", id: "pheno" },
      {
        header: "Matched Phenotypes",
        id: "matchedPhenotypes",
        accessorKey: "clinicalEvidence.matchedPhenotypes",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "CLINVAR",
        id: "clinvar",
        accessorKey: "clinicalEvidence.CLINVAR",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "OMIM",
        id: "omim",
        accessorKey: "clinicalEvidence.OMIM",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "OMIM Inheritance",
        id: "omimInheritance",
        accessorKey: "clinicalEvidence.OMIM Inheritance",
        meta: {
          filterVariant: "checkbox",
        },
      },
      { header: "LitVar2", accessorKey: "clinicalEvidence.LitVar2", id: "litvar2" },
    ],
  },
  {
    header: "In House",
    columns: [
      {
        header: "V",
        id: "v",
        accessorKey: "inHouse.V",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "G",
        id: "g",
        accessorKey: "inHouse.G",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "AF%",
        id: "af%",
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
        id: "effect",
        accessorKey: "effectAndPrediction.EFFECT",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "Sev",
        id: "sev",
        accessorKey: "effectAndPrediction.Sev",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "CADD(PHRED)",
        id: "caddPhred",
        accessorKey: "effectAndPrediction.CADD(PHRED)",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "Splice-AI",
        id: "spiceAi",
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
