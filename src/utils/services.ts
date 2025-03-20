import Papa from "papaparse";

export const getTableData = async (url: string, callBack: any) => {
  try {
    const csvText = await (await fetch(url)).text();

    const finalData = Papa.parse(csvText, {
      header: true, // Treat first row as headers
      skipEmptyLines: true, // Skip empty lines
      complete: (result) => {
        const formattedData = result.data.map((row: any) => {
          return {
            location: row.LOCATION,
            gene: row["SYMBOL (GENE NAME)"],
            genomicsAndGeneticInformation: {
              GENE: row["GENE (GENE ID)"],
              REF: row.REF,
              ALT: row.ALT,
              ZYGOSITY: row["ZYGOSITY LABEL"],
              CODONS: row.CODONS,
              SPNS: row["SNPS/RSID"],
              HGVSC: row["HGVSC VEP"],
              HGVSP: row["HGVSP VEP"],
              LOVD: row["LOVD"],
              AMINOACIDS: row["AMINO ACIDS"],
              MANE: row["MANE SELECT"],
              MANEPLUS: row["MANE PLUS CLINICAL"],
              SPLICEREGION: row["SPLICEREGION"],
            },
            ACMG: {
              ACMGCLASSIFICATION: row["ACMG CLASSIFICATION LABEL"],
            },
            variantCallingQR: {
              IMPACT: row.IMPACT,
              DP: row.DP,
              GQ: row.GQ,
              PL: row.PL,
              QUAL: row.QUAL,
              FILTER: row.FILTER,
            },
            clinicalEvidence: {
              PHENOTYPES: row.PHENOTYPES,
              CLINVARCLNSIG: row["CLINSIG LABEL"],
              CLINVARREVIEW: row["CLINVAR REVIEW"],
              ACMGDISEASEID: row["ACMG DISEASE ID (OMIM/ORPHA ID)"],
              MOI: row.MOI,
              PUBMED: row.PUBMED,
            },
          };
        });

        callBack(formattedData);
      },
    });

    return finalData;
  } catch (error) {
    console.log("Error parsing CSV", error);
    throw new Error("Error parsing CSV");
  }
};
