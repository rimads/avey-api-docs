import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import myDarkTheme from "./src/theme/my-dark-theme";
import {
  rehypeCode,
  rehypeCodeDefaultOptions,
} from "fumadocs-core/mdx-plugins";
import { z } from "zod";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      new: z.string().optional(),
      sidebar_title: z.string().optional(),
    }),
  },
  meta: {
    schema: metaSchema.extend({
      new: z.string().optional(),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    rehypePlugins: [rehypeCode],
    rehypeCodeOptions: {
      themes: {
        dark: "github-dark",
        light: "github-light",
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        // transformerTwoslash(),
      ],
    },
  },
});
