import { generateFiles } from "fumadocs-openapi";

void generateFiles({
  // the OpenAPI schema, you can also give it an external URL.
  input: ["./avey-api.json"],

  output: "./content/docs",
  // we recommend to enable it
  // make sure your endpoint description doesn't break MDX syntax.
  includeDescription: true,



});
