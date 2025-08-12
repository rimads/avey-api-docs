"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function Mermaid({ chart }: { chart: string }) {
  const id = useId();
  const [svg, setSvg] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const currentChartRef = useRef<string>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (currentChartRef.current === chart || !containerRef.current) return;
    const container = containerRef.current;
    currentChartRef.current = chart;

    async function renderChart() {
      const { default: mermaid } = await import("mermaid");

      try {
        // configure mermaid
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          fontFamily: "inherit",
          themeCSS: "margin: 1.5rem auto 0;",
          theme: "base",
          themeVariables: {
            // Brand colors
            primaryColor: "transparent",
            primaryBorderColor:
              resolvedTheme === "dark" ? "#44BEDF" : "#77E0FF",
            primaryTextColor: resolvedTheme === "dark" ? "#ffffff" : "#121212",
            // Node styles
            nodeTextColor: resolvedTheme === "dark" ? "#ffffff" : "#121212",
            fontSize: "14px",

            // Edge styles
            lineColor: resolvedTheme === "dark" ? "#44BEDF" : "#77E0FF",
            edgeLabelBackground: "transparent",
            // Background
            background: "transparent",
          },
        });

        const { svg, bindFunctions } = await mermaid.render(
          id,
          chart.replaceAll("\\n", "\n")
        );

        bindFunctions?.(container);
        setSvg(svg);
      } catch (error) {
        console.error("Error while rendering mermaid", error);
      }
    }

    void renderChart();
  }, [chart, id, resolvedTheme]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: svg }} />;
}
