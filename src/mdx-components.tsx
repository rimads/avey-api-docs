import defaultComponents from "fumadocs-ui/mdx";
import { APIPage } from "fumadocs-openapi/ui";
import { openapi } from "@/lib/source";
import type { MDXComponents } from "mdx/types";
import myDark from "@/theme/my-dark-theme";
import { Mermaid } from "./components/mdx/mermaid";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    APIPage: (props) => (
      <APIPage
        shikiOptions={{
          themes: {
            dark: "github-dark",
            light: "github-light",
          },
        }}
        {...openapi.getAPIPageProps(props)}
      />
    ),
    Mermaid,
    ...components,
  };
}
