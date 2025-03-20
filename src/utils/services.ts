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
            effectAndPrediction: {
              CADDPHRED: row["CADD PHRED"],
              CADDRAW: row["CADD RAW"],
              ALPHAMISSENSERANKSCORE: row["ALPHAMISSENSE RANKSCORE"],
              ALPHAMISSENSESCORE: row["ALPHAMISSENSE SCORE"],
              IMPACT: row["LRT PRED"], //column missing in final file
              EFFECT: row["LRT PRED"], //column missing in final file
              LRTPRED: row["LRT PRED"],
              LRTSCORE: row["LRT SCORE"],
              MUTATIONTASTERPRED: row["MUTATIONTASTER PRED"],
              MUTATIONTASTERSCORE: row["MUTATIONTASTER SCORE"],
              ADASCORE: row["ADA SCORE"],
              RFSCORE: row["RF SCORE"],
              SIFT4GSCORE: row["SIFT4G SCORE"],
              SIFT: row["SIFT4G PRED"],
              REVELSCORE: row["REVEL SCORE"],
              GERPNR: row["GERP++ NR"],
              GERPRS: row["GERP++ RS"],
              GERPRSRANKSCORE: row["GERP++ RS RANKSCORE"],
            },
            frequency: {
              AF: row.AF,
              GNOMADEXOMESSASAF: row["GNOMAD EXOMES SAS AF"],
              "1000GP3SASAF": row["1000GP3 SAS AF"],
              ESP6500EAAF: row["ESP6500 EA AF"],
              EXACSASAF: row["EXAC SAS AF"],
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
