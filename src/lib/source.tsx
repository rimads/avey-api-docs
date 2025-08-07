import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createOpenAPI, attachFile } from "fumadocs-openapi/server";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import myDark from "@/theme/my-dark-theme";
// import myLight from '@/theme/my-light-theme';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/",
  source: docs.toFumadocsSource(),
  pageTree: {
    attachFile(node, file) {
      if (!file) return node;

      const data = file.data;
      // Use sidebar_title if available, otherwise keep the default title
      if (data.sidebar_title) {
        node.name = data.sidebar_title;
      }

      node.name = (
        <>
          <span className="ml-2 flex justify-between w-full items-center -pr-8">
            {node.name}

            {data.new && (
              <span className="ml-1 text-white dark:text-av-blue-100 rounded-full bg-blue-400 px-2.5 py-0.5 text-xs font-medium text-right">
                NEW!
              </span>
            )}
          </span>
        </>
      );

      return attachFile(node, file);
    },
  },
});
export const openapi = createOpenAPI();
