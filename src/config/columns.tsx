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
      defaultVisibility: true,
    },
  },
  {
    header: "SYMBOL (GENE NAME)",
    accessorKey: "gene",
    filterFn: filterFunctionForText,
    meta: {
      filterVariant: "text",
      defaultVisibility: true,
    },
  },

  // Genomics and Genetic Information
  {
    header: "Genomics & Genetic Information",
    columns: [
      {
        header: "GENE (GENE ID)",
        id: "genomics-gene",
        accessorKey: "genomicsAndGeneticInformation.GENE",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: true,
        },
      },
      {
        header: "REF",
        id: "genomics-ref",
        accessorKey: "genomicsAndGeneticInformation.REF",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: true,
        },
      },
      {
        header: "ALT",
        id: "genomics-alt",
        accessorKey: "genomicsAndGeneticInformation.ALT",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: true,
        },
      },
      {
        header: "ZYGOSITY",
        id: "genomics-zygosity",
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
          defaultVisibility: true,
        },
      },
      {
        header: "CODONS",
        id: "genomics-codons",
        accessorKey: "genomicsAndGeneticInformation.CODONS",
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "SNPS/RSID",
        id: "genomics-snps",
        accessorKey: "genomicsAndGeneticInformation.SPNS",
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "HGVSC VEP",
        id: "genomics-hgvsc",
        accessorKey: "genomicsAndGeneticInformation.HGVSC",
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "HGVSP VEP",
        id: "genomics-hgvsp",
        accessorKey: "genomicsAndGeneticInformation.HGVSP",
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "LOVD (refseq)",
        id: "genomics-lovd",
        accessorKey: "genomicsAndGeneticInformation.LOVD",
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "AMINO ACIDS",
        id: "genomics-aminoacids",
        accessorKey: "genomicsAndGeneticInformation.AMINOACIDS",
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "MANE SELECT",
        id: "genomics-mane",
        accessorKey: "genomicsAndGeneticInformation.MANE",
        cell: (info) => (
          <span className="text-heading-blue">{info.getValue<string>()}</span>
        ),
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "MANE PLUS CLINICAL",
        id: "genomics-maneplus",
        accessorKey: "genomicsAndGeneticInformation.MANEPLUS",
        cell: (info) => (
          <span className="text-heading-blue">{info.getValue<string>()}</span>
        ),
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "SPLICEREGION",
        id: "genomics-spliceregion",
        accessorKey: "genomicsAndGeneticInformation.SPLICEREGION",
        cell: (info) => (
          <span className="text-heading-blue">{info.getValue<string>()}</span>
        ),
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
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
        id: "acmg-acmgclassification",
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
        id: "variant-impact",
        accessorKey: "variantCallingQR.IMPACT",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: true,
        },
      },
      {
        header: "DP",
        id: "variant-dp",
        accessorKey: "variantCallingQR.DP",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: true,
        },
      },
      {
        header: "GQ",
        id: "variant-gq",
        accessorKey: "variantCallingQR.GQ",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: true,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "PL",
        id: "variant-pl",
        accessorKey: "variantCallingQR.PL",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "QUAL",
        id: "variant-qual",
        accessorKey: "variantCallingQR.QUAL",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "FILTER",
        id: "variant-filter",
        accessorKey: "variantCallingQR.FILTER",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
    ],
  },

  // clinical evidence
  {
    header: "Clinical Evidence",
    columns: [
      {
        header: "PHENOTYPES",
        accessorKey: "clinicalEvidence.PHENOTYPES",
        id: "clinical-phenotypes",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: true,
        },
      },
      {
        header: "CLINVAR CLNSIG",
        accessorKey: "clinicalEvidence.CLINVARCLNSIG",
        id: "clinical-clinvarclnsig",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: true,
        },
      },
      {
        header: "CLINVAR REVIEW",
        accessorKey: "clinicalEvidence.CLINVARREVIEW",
        id: "clinical-clinvarreview",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: true,
        },
      },
      {
        header: "ACMG DISEASE ID (OMIM/ORPHA ID)",
        accessorKey: "clinicalEvidence.ACMGDISEASEID",
        id: "clinical-acmgdiseaseid",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
      },
      {
        header: "MOI",
        accessorKey: "clinicalEvidence.MOI",
        id: "clinical-moi",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
      },
      {
        header: "PUBMED",
        accessorKey: "clinicalEvidence.PUBMED",
        id: "clinical-pubmed",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
      },
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
        id: "effect-caddphred",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: true,
        },
      },
      {
        header: "CADD RAW",
        accessorKey: "effectAndPrediction.CADDRAW",
        id: "effect-caddraw",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: true,
        },
      },
      {
        header: "ALPHAMISSENSE RANKSCORE",
        accessorKey: "effectAndPrediction.ALPHAMISSENSERANKSCORE",
        id: "effect-alphamissenserankscore",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: true,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "IMPACT",
        accessorKey: "effectAndPrediction.IMPACT",
        id: "effect-impact",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "EFFECT",
        accessorKey: "effectAndPrediction.EFFECT",
        id: "effect-effect",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "LRT PRED",
        accessorKey: "effectAndPrediction.LRTPRED",
        id: "effect-lrtpred",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "LRT SCORE",
        accessorKey: "effectAndPrediction.LRTSCORE",
        id: "effect-lrtscore",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "MUTATIONTASTER PRED",
        accessorKey: "effectAndPrediction.MUTATIONTASTERPRED",
        id: "effect-mutationtasterpred",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "MUTATIONTASTER SCORE",
        accessorKey: "effectAndPrediction.MUTATIONTASTERSCORE",
        id: "effect-mutationtasterscore",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "ADA SCORE",
        accessorKey: "effectAndPrediction.ADASCORE",
        id: "effect-adascore",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "RF SCORE",
        accessorKey: "effectAndPrediction.RFSCORE",
        id: "effect-rfscore",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "SIFT4G SCORE",
        accessorKey: "effectAndPrediction.SIFT4GSCORE",
        id: "effect-sift4gscore",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "SIFT",
        accessorKey: "effectAndPrediction.SIFT",
        id: "effect-sift",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "REVEL SCORE",
        accessorKey: "effectAndPrediction.REVELSCORE",
        id: "effect-revelscore",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "GERP++ NR",
        accessorKey: "effectAndPrediction.GERPNR",
        id: "effect-gerpnr",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "GERP++ RS",
        accessorKey: "effectAndPrediction.GERPRS",
        id: "effect-gerprs",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "GERP++ RS RANKSCORE",
        accessorKey: "effectAndPrediction.GERPRSRANKSCORE",
        id: "effect-gerprsrankscore",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
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
        id: "frequency-af",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: true,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "GNOMAD EXOMES SAS AF",
        accessorKey: "frequency.GNOMADEXOMESSASAF",
        id: "frequency-gnomadexomessasaf",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: true,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "1000GP3 SAS AF",
        accessorKey: "frequency.1000GP3SASAF",
        id: "frequency-1000gp3sasaf",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: true,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "ESP6500 EA AF",
        accessorKey: "frequency.ESP6500EAAF",
        id: "frequency-esp6500eaaf",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "EXAC SAS AF",
        accessorKey: "frequency.EXACSASAF",
        id: "frequency-exacsasaf",
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
    ],
  },
];
