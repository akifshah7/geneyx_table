import { ColumnDef } from "@tanstack/react-table";
import {
  filterFunctionForNumbers,
  filterFunctionForText,
  filterFunctionForTextCheckbox,
} from "../utils/filters";

export interface DataType {
  location: string;
  gene: string;
  genomicsAndGeneticInformation: {
    GENE: string;
    REF: string;
    ALT: string;
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
        filterFn: filterFunctionForTextCheckbox,
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: true,
        },
      },
      {
        header: "ALT",
        id: "genomics-alt",
        accessorKey: "genomicsAndGeneticInformation.ALT",
        filterFn: filterFunctionForTextCheckbox,
        meta: {
          filterVariant: "checkbox",
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
        // Add this filter function
        filterFn: filterFunctionForTextCheckbox,
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: true,
        },
      },
      {
        header: "CODONS",
        id: "genomics-codons",
        accessorKey: "genomicsAndGeneticInformation.CODONS",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "SNPS/RSID",
        id: "genomics-snps",
        accessorKey: "genomicsAndGeneticInformation.SPNS",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "HGVSC VEP",
        id: "genomics-hgvsc",
        accessorKey: "genomicsAndGeneticInformation.HGVSC",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "HGVSP VEP",
        id: "genomics-hgvsp",
        accessorKey: "genomicsAndGeneticInformation.HGVSP",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "LOVD (refseq)",
        id: "genomics-lovd",
        accessorKey: "genomicsAndGeneticInformation.LOVD",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "AMINO ACIDS",
        id: "genomics-aminoacids",
        accessorKey: "genomicsAndGeneticInformation.AMINOACIDS",
        filterFn: filterFunctionForText,
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
        filterFn: filterFunctionForTextCheckbox,
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
        filterFn: filterFunctionForTextCheckbox,
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: true,
        },
      },
      {
        header: "DP",
        id: "variant-dp",
        accessorKey: "variantCallingQR.DP",
        filterFn: filterFunctionForNumbers,
        meta: {
          filterVariant: "number",
          defaultVisibility: true,
        },
      },
      {
        header: "GQ",
        id: "variant-gq",
        accessorKey: "variantCallingQR.GQ",
        meta: {
          defaultVisibility: true,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "PL",
        id: "variant-pl",
        accessorKey: "variantCallingQR.PL",
        meta: {
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "QUAL",
        id: "variant-qual",
        accessorKey: "variantCallingQR.QUAL",
        meta: {
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "FILTER",
        id: "variant-filter",
        accessorKey: "variantCallingQR.FILTER",
        meta: {
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
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: true,
        },
      },
      {
        header: "CLINVAR CLNSIG",
        accessorKey: "clinicalEvidence.CLINVARCLNSIG",
        id: "clinical-clinvarclnsig",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: true,
        },
      },
      {
        header: "CLINVAR REVIEW",
        accessorKey: "clinicalEvidence.CLINVARREVIEW",
        id: "clinical-clinvarreview",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: true,
        },
      },
      {
        header: "ACMG DISEASE ID (OMIM/ORPHA ID)",
        accessorKey: "clinicalEvidence.ACMGDISEASEID",
        id: "clinical-acmgdiseaseid",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "MOI",
        accessorKey: "clinicalEvidence.MOI",
        id: "clinical-moi",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "PUBMED",
        accessorKey: "clinicalEvidence.PUBMED",
        id: "clinical-pubmed",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
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

  //       },
  //     },
  //     {
  //       header: "G",
  //       accessorKey: "inHouse.G",
  //       meta: {

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
        filterFn: filterFunctionForNumbers,
        meta: {
          filterVariant: "number",
          defaultVisibility: true,
        },
      },
      {
        header: "CADD RAW",
        accessorKey: "effectAndPrediction.CADDRAW",
        id: "effect-caddraw",
        filterFn: filterFunctionForNumbers,
        meta: {
          filterVariant: "number",
          defaultVisibility: true,
        },
      },
      {
        header: "ALPHAMISSENSE RANKSCORE",
        accessorKey: "effectAndPrediction.ALPHAMISSENSERANKSCORE",
        id: "effect-alphamissenserankscore",
        filterFn: filterFunctionForNumbers,
        meta: {
          filterVariant: "number",
          defaultVisibility: true,
        },
      },
      {
        header: "ALPHAMISSENSE SCORE",
        accessorKey: "effectAndPrediction.ALPHAMISSENSESCORE",
        id: "effect-alphamissensescore",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: true,
        },
      },
      {
        header: "IMPACT",
        accessorKey: "effectAndPrediction.IMPACT",
        id: "effect-impact",
        filterFn: filterFunctionForTextCheckbox,
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
      },
      {
        header: "EFFECT",
        accessorKey: "effectAndPrediction.EFFECT",
        id: "effect-effect",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "LRT PRED",
        accessorKey: "effectAndPrediction.LRTPRED",
        id: "effect-lrtpred",
        filterFn: filterFunctionForTextCheckbox,
        meta: {
          filterVariant: "checkbox",
          defaultVisibility: false,
        },
      },
      {
        header: "LRT SCORE",
        accessorKey: "effectAndPrediction.LRTSCORE",
        id: "effect-lrtscore",
        filterFn: filterFunctionForNumbers,
        meta: {
          filterVariant: "number",
          defaultVisibility: false,
        },
      },
      {
        header: "MUTATIONTASTER PRED",
        accessorKey: "effectAndPrediction.MUTATIONTASTERPRED",
        id: "effect-mutationtasterpred",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "MUTATIONTASTER SCORE",
        accessorKey: "effectAndPrediction.MUTATIONTASTERSCORE",
        id: "effect-mutationtasterscore",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "ADA SCORE",
        accessorKey: "effectAndPrediction.ADASCORE",
        id: "effect-adascore",
        filterFn: filterFunctionForNumbers,
        meta: {
          filterVariant: "number",
          defaultVisibility: false,
        },
      },
      {
        header: "RF SCORE",
        accessorKey: "effectAndPrediction.RFSCORE",
        id: "effect-rfscore",
        filterFn: filterFunctionForNumbers,
        meta: {
          filterVariant: "number",
          defaultVisibility: false,
        },
      },
      {
        header: "SIFT4G SCORE",
        accessorKey: "effectAndPrediction.SIFT4GSCORE",
        id: "effect-sift4gscore",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "SIFT",
        accessorKey: "effectAndPrediction.SIFT",
        id: "effect-sift",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "REVEL SCORE",
        accessorKey: "effectAndPrediction.REVELSCORE",
        id: "effect-revelscore",
        filterFn: filterFunctionForText,
        meta: {
          filterVariant: "text",
          defaultVisibility: false,
        },
      },
      {
        header: "GERP++ NR",
        accessorKey: "effectAndPrediction.GERPNR",
        id: "effect-gerpnr",
        filterFn: filterFunctionForNumbers,
        meta: {
          filterVariant: "number",
          defaultVisibility: false,
        },
      },
      {
        header: "GERP++ RS",
        accessorKey: "effectAndPrediction.GERPRS",
        id: "effect-gerprs",
        meta: {
          defaultVisibility: false,
        },
        filterFn: filterFunctionForNumbers,
      },
      {
        header: "GERP++ RS RANKSCORE",
        accessorKey: "effectAndPrediction.GERPRSRANKSCORE",
        id: "effect-gerprsrankscore",
        filterFn: filterFunctionForNumbers,
        meta: {
          filterVariant: "number",
          defaultVisibility: false,
        },
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
        filterFn: filterFunctionForNumbers,
        meta: {
          filterVariant: "number",
          defaultVisibility: true,
        },
      },
      {
        header: "GNOMAD EXOMES SAS AF",
        accessorKey: "frequency.GNOMADEXOMESSASAF",
        id: "frequency-gnomadexomessasaf",
        filterFn: filterFunctionForNumbers,
        meta: {
          filterVariant: "number",
          defaultVisibility: true,
        },
      },
      {
        header: "1000GP3 SAS AF",
        accessorKey: "frequency.1000GP3SASAF",
        id: "frequency-1000gp3sasaf",
        filterFn: filterFunctionForNumbers,
        meta: {
          filterVariant: "number",
          defaultVisibility: true,
        },
      },
      {
        header: "ESP6500 EA AF",
        accessorKey: "frequency.ESP6500EAAF",
        id: "frequency-esp6500eaaf",
        filterFn: filterFunctionForNumbers,
        meta: {
          filterVariant: "number",
          defaultVisibility: false,
        },
      },
      {
        header: "EXAC SAS AF",
        accessorKey: "frequency.EXACSASAF",
        id: "frequency-exacsasaf",
        filterFn: filterFunctionForNumbers,
        meta: {
          filterVariant: "number",
          defaultVisibility: false,
        },
      },
    ],
  },
];
