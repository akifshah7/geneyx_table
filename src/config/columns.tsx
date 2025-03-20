import { ColumnDef } from "@tanstack/react-table";
import {
  filterFunctionForNumbers,
  filterFunctionForText,
} from "../utils/filters";

export interface DataType {
  location: string;
  gene: string;
  genomicsAndGeneticInformation: {
    REF: string;
    ALT: string;
    AA: string;
    ZYGOSITY: string;
    CODONS: string;
    SPNS: string;
    HGVSC: string;
    HGVSP: string;
    LOVD: string;
    AMINOACIDS: string;
    MANE: string;
    MANEPLUS: string;
    SPLICEREGION: string;
  };
  ACMG: {
    ACMGCLASSIFICATION: string;
  };
  variantCallingQR: {
    IMPACT: string;
    DP: number;
    GQ: number;
    PL: number;
    QUAL: number;
    FILTER: string;
  };

  // clinical evidence
  clinicalEvidence: {
    PHENOTYPES: string;
    CLINVARCLNSIG: string;
    CLINVARREVIEW: string;
    ACMGDISEASEID: string;
    MOI: string;
    PUBMED: string;
  };
  // inHouse: {
  //   V: string;
  //   G: string;
  //   "AF%": string;
  // };

  // effect and prediction
  effectAndPrediction: {
    CADDPHRED: string;
    CADDRAW: string;
    ALPHAMISSENSERANKSCORE: number;
    IMPACT: string;
    EFFECT: string;
    LRTPRED: string;
    LRTSCORE: string;
    MUTATIONTASTERPRED: string;
    MUTATIONTASTERSCORE: string;
    ADASCORE: string;
    RFSCORE: string;
    SIFT4GSCORE: number;
    SIFT: string;
    REVELSCORE: string;
    GERPNR: number;
    GERPRS: number;
    GERPRSRANKSCORE: number;
  };

  // frequency
  frequency: {
    AF: string;
    GNOMADEXOMESSASAF: string;
    "1000GP3SASAF": string;
    ESP6500EAAF: string;
    EXACSASAF: string;
  };
}

// todo: need to add more styles to columns
export const columns: ColumnDef<DataType, any>[] = [
  {
    header: "LOCATION",
    id: "location",
    accessorKey: "location",
    filterFn: filterFunctionForText,
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: "SYMBOL (GENE NAME)",
    accessorKey: "gene",
    filterFn: filterFunctionForText,
    meta: {
      filterVariant: "text",
    },
  },

  // Genomics and Genetic Information
  {
    header: "Genomics & Genetic Information",
    columns: [
      {
        header: "GENE (GENE ID)",
        accessorKey: "genomicsAndGeneticInformation.GENE",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
        },
      },
      {
        header: "REF",
        accessorKey: "genomicsAndGeneticInformation.REF",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
        },
      },
      {
        header: "ALT",
        accessorKey: "genomicsAndGeneticInformation.ALT",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
        },
      },
      {
        header: "ZYGOSITY",
        accessorKey: "genomicsAndGeneticInformation.ZYGOSITY",
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
        header: "CODONS",
        id: "codons",
        accessorKey: "genomicsAndGeneticInformation.CODONS",
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "SNPS/RSID",
        id: "spns",
        accessorKey: "genomicsAndGeneticInformation.SPNS",
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "HGVSC VEP",
        id: "hgvsc",
        accessorKey: "genomicsAndGeneticInformation.HGVSC",
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "HGVSP VEP",
        id: "hgvsp",
        accessorKey: "genomicsAndGeneticInformation.HGVSP",
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "LOVD (refseq)",
        id: "lovd",
        accessorKey: "genomicsAndGeneticInformation.LOVD",
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "AMINO ACIDS",
        id: "aminoacids",
        accessorKey: "genomicsAndGeneticInformation.AMINOACIDS",
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "MANE SELECT",
        id: "mane",
        accessorKey: "genomicsAndGeneticInformation.MANE",
        cell: (info) => (
          <span className="text-heading-blue">{info.getValue<string>()}</span>
        ),
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
        },
      },
      {
        header: "MANE PLUS CLINICAL",
        id: "maneplus",
        accessorKey: "genomicsAndGeneticInformation.MANEPLUS",
        cell: (info) => (
          <span className="text-heading-blue">{info.getValue<string>()}</span>
        ),
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
        },
      },
      {
        header: "SPLICEREGION",
        id: "spliceregion",
        accessorKey: "genomicsAndGeneticInformation.SPLICEREGION",
        cell: (info) => (
          <span className="text-heading-blue">{info.getValue<string>()}</span>
        ),
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
        },
      },
    ],
  },

  // ACMG
  {
    header: "ACMG",
    columns: [
      {
        header: "ACMG CLASSIFICATION",
        accessorKey: "ACMG.ACMGCLASSIFICATION",
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

  // variant calling
  {
    header: "Variant Calling Q&R",
    columns: [
      {
        header: "IMPACT",
        accessorKey: "variantCallingQR.IMPACT",
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
        accessorKey: "variantCallingQR.PL",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "QUAL",
        accessorKey: "variantCallingQR.QUAL",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "FILTER",
        accessorKey: "variantCallingQR.FILTER",
        filterFn: filterFunctionForNumbers,
      },
    ],
  },

  // clinical evidence
  {
    header: "Clinical Evidence",
    columns: [
      { header: "PHENOTYPES", accessorKey: "clinicalEvidence.PHENOTYPES" },
      {
        header: "CLINVAR CLNSIG",
        accessorKey: "clinicalEvidence.CLINVARCLNSIG",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "CLINVAR REVIEW",
        accessorKey: "clinicalEvidence.CLINVARREVIEW",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "ACMG DISEASE ID (OMIM/ORPHA ID)",
        accessorKey: "clinicalEvidence.ACMGDISEASEID",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "MOI",
        accessorKey: "clinicalEvidence.MOI",
        meta: {
          filterVariant: "checkbox",
        },
      },
      { header: "PUBMED", accessorKey: "clinicalEvidence.PUBMED" },
    ],
  },
  // {
  //   header: "In House",
  //   columns: [
  //     {
  //       header: "V",
  //       accessorKey: "inHouse.V",
  //       meta: {
  //         filterVariant: "checkbox",
  //       },
  //     },
  //     {
  //       header: "G",
  //       accessorKey: "inHouse.G",
  //       meta: {
  //         filterVariant: "checkbox",
  //       },
  //     },
  //     {
  //       header: "AF%",
  //       accessorKey: "inHouse.AF%",
  //       filterFn: filterFunctionForNumbers,
  //     },
  //   ],
  // },

  // effect & prediction
  {
    header: "Effect & Prediction",
    columns: [
      {
        header: "CADD PHRED",
        accessorKey: "effectAndPrediction.CADDPHRED",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "CADD RAW",
        accessorKey: "effectAndPrediction.CADDRAW",
        meta: {
          filterVariant: "checkbox",
        },
      },
      {
        header: "ALPHAMISSENSE RANKSCORE",
        accessorKey: "effectAndPrediction.ALPHAMISSENSERANKSCORE",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "IMPACT",
        accessorKey: "effectAndPrediction.IMPACT",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "EFFECT",
        accessorKey: "effectAndPrediction.EFFECT",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "LRT PRED",
        accessorKey: "effectAndPrediction.LRTPRED",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "LRT SCORE",
        accessorKey: "effectAndPrediction.LRTSCORE",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "MUTATIONTASTER PRED",
        accessorKey: "effectAndPrediction.MUTATIONTASTERPRED",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "MUTATIONTASTER SCORE",
        accessorKey: "effectAndPrediction.MUTATIONTASTERSCORE",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "ADA SCORE",
        accessorKey: "effectAndPrediction.ADASCORE",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "RF SCORE",
        accessorKey: "effectAndPrediction.RFSCORE",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "SIFT4G SCORE",
        accessorKey: "effectAndPrediction.SIFT4GSCORE",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "SIFT",
        accessorKey: "effectAndPrediction.SIFT",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "REVEL SCORE",
        accessorKey: "effectAndPrediction.REVELSCORE",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "GERP++ NR",
        accessorKey: "effectAndPrediction.GERPNR",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "GERP++ RS",
        accessorKey: "effectAndPrediction.GERPRS",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "GERP++ RS RANKSCORE",
        accessorKey: "effectAndPrediction.GERPRSRANKSCORE",
        filterFn: filterFunctionForNumbers,
      },
    ],
  },
  {
    header: "Frequency",
    columns: [
      {
        header: "AF",
        accessorKey: "frequency.AF",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "GNOMAD EXOMES SAS AF",
        accessorKey: "frequency.GNOMADEXOMESSASAF",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "1000GP3 SAS AF",
        accessorKey: "frequency.1000GP3SASAF",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "ESP6500 EA AF",
        accessorKey: "frequency.ESP6500EAAF",
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "EXAC SAS AF",
        accessorKey: "frequency.EXACSASAF",
        filterFn: filterFunctionForNumbers,
      },
    ],
  },
];
