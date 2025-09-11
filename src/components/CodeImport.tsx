import { promises as fs } from "fs";
import path from "path";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";

interface CodeImportProps {
  src: string;
  title?: string;
  lang?: string;
}

export async function CodeImport({ src, title, lang }: CodeImportProps) {
  try {
    const filePath = path.join(process.cwd(), src);
    const content = await fs.readFile(filePath, "utf8");

    // Determine language from file extension if not provided
    const extension = path.extname(src).slice(1);
    const language = lang || extension || "text";

    return (
      <CodeBlock title={title}>
        <Pre lang={language}>{content}</Pre>
      </CodeBlock>
    );
  } catch (error) {
    return (
      <div className="border border-red-200 bg-red-50 p-4 rounded">
        <p className="text-red-600">Error loading file: {src}</p>
        <p className="text-sm text-red-500">
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }
}
