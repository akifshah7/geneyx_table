import { ColumnDef } from "@tanstack/react-table";

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
      },
      {
        header: "ALT",
        accessorKey: "genomicAndGeneticData.ALT",
      },
      {
        header: "AA",
        accessorKey: "genomicAndGeneticData.AA",
        cell: (info) => (
          <span className="text-heading-blue">{info.getValue<string>()}</span>
        ),
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
