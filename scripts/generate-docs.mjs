import { generateFiles } from "fumadocs-openapi";
import { readdirSync, existsSync, renameSync, rmSync } from "fs";
import { basename, join } from "path";

const target = (process.argv[2] || "").toLowerCase();

const jsonDir = "./json";
const files = readdirSync(jsonDir).filter((f) => f.endsWith(".json"));

const inputs = {};
for (const file of files) {
  const key = basename(file, ".json");
  inputs[key] = join(jsonDir, file);
}

// Helper function to move untagged endpoints from "unknown" folder to top level
function moveUntaggedToTopLevel(outputDir) {
  const unknownDir = join(outputDir, "unknown");

  if (!existsSync(unknownDir)) {
    return; // No untagged endpoints
  }

  // Move all files from unknown folder to parent directory
  const unknownFiles = readdirSync(unknownDir);
  for (const file of unknownFiles) {
    const sourcePath = join(unknownDir, file);
    const destPath = join(outputDir, file);
    renameSync(sourcePath, destPath);
    console.log(`Moved ${file} from unknown/ to top level`);
  }

  // Remove the empty unknown folder
  rmSync(unknownDir, { recursive: true });
  console.log("Removed empty unknown/ folder");
}

console.log(target);
if (!target || target === "all") {
  for (const [key, path] of Object.entries(inputs)) {
    const outputDir = `./content/docs/${key}`;
    await generateFiles({
      input: [path],
      output: outputDir,
      includeDescription: true,
      groupBy: "tag",
    });
    moveUntaggedToTopLevel(outputDir);
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

const outputDir = `./content/docs/${target}`;
await generateFiles({
  input: [inputs[target]],
  output: outputDir,
  includeDescription: true,
  groupBy: "tag",
});
moveUntaggedToTopLevel(outputDir);

console.log(`Generated docs for ${target}`);
