import { generateFiles } from "fumadocs-openapi";

const target = (process.argv[2] || "").toLowerCase();

const inputs = {
  procedure: "./json/procedure.json",
  diagnosis: "./json/diagnosis.json",
  drug: "./json/drug.json",
  cpt: "./json/cpt.json",
  icd: "./json/icd.json",
  ndc: "./json/ndc.json",
};

if (!inputs[target]) {
  console.error(
    "Usage: node scripts/generate-docs.mjs <procedure|diagnosis|drug|cpt|icd|ndc>"
  );
  process.exit(1);
}

await generateFiles({
  input: [inputs[target]],
  output: `./content/docs/${target}`,
  includeDescription: true,
});

console.log(`Generated docs for ${target}`);
