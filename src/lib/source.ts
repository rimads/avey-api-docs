import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createOpenAPI, attachFile } from 'fumadocs-openapi/server';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import myDark from '@/theme/my-dark-theme';
// import myLight from '@/theme/my-light-theme';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: '/',
  source: docs.toFumadocsSource(),
  pageTree: {
    attachFile,
  },
});
export const openapi = createOpenAPI({
  // renderer: {
  //   // This replaces ONLY the code-sample blocks inside API pages
  //   CodeBlock(props) {
  //     return (
  //       <DynamicCodeBlock
  //         {...props}
  //         options={{
  //           themes: { dark: myDark, light: myLight },   // <- your palette
  //         }}
  //       />
  //     );
  //   },
  // },
});