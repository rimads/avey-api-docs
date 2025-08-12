import defaultComponents from "fumadocs-ui/mdx";
import { APIPage } from "fumadocs-openapi/ui";
import { openapi } from "@/lib/source";
import type { MDXComponents } from "mdx/types";

import { Mermaid } from "./components/mdx/mermaid";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";

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
    Accordions,
    Accordion,
    ...TabsComponents,
    ...components,
  };
}
