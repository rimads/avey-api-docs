import defaultComponents from "fumadocs-ui/mdx";
import { APIPage } from "fumadocs-openapi/ui";
import { openapi } from "@/lib/source";
import type { MDXComponents } from "mdx/types";
import { Mermaid } from "./components/mdx/mermaid";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { createGenerator } from "fumadocs-typescript";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { CodeImport } from "./components/CodeImport";
import { Violation, SeverityGrid, DataSourceGrid, Roadmap } from "./components/mdx/Adjudication";
import { Callout } from "fumadocs-ui/components/callout";

const generator = createGenerator();
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
    Callout,
    ...TabsComponents,
    AutoTypeTable: (props) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    CodeImport,
    Violation,
    SeverityGrid,
    DataSourceGrid,
    Roadmap,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),

    ...components,
  };
}
