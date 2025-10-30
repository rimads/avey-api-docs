import { generateFiles } from "fumadocs-openapi";
import { readdirSync } from "fs";
import { basename, join } from "path";

const target = (process.argv[2] || "").toLowerCase();

const jsonDir = "./json";
const files = readdirSync(jsonDir).filter((f) => f.endsWith(".json"));

const inputs = {};
for (const file of files) {
  const key = basename(file, ".json");
  inputs[key] = join(jsonDir, file);
}

console.log(target);
if (!target || target === "all") {
  for (const [key, path] of Object.entries(inputs)) {
    await generateFiles({
      input: [path],
      output: `./content/docs/${key}`,
      includeDescription: true,
      groupBy: "tag",
    });
    console.log(`Generated docs for ${key}`);
  }
  process.exit(0);
}

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
  groupBy: "tag",
});

console.log(`Generated docs for ${target}`);
