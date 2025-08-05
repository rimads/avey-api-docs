import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import myDarkTheme from './src/theme/my-dark-theme';
import { rehypeCode, rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';


// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
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
}});
