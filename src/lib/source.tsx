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
      console.log("node", node, data.new);

      if (data.new) {
        node.name = (
          <>
            <span className="flex justify-between w-full items-center">
              {node.name}

              <span className="mr-1 rounded-full bg-av-blue-500 px-2.5 py-0.5 text-xs font-medium text-fd-background text-right">
                NEW!
              </span>
            </span>
          </>
        );
      }

      return attachFile(node, file);
    },
  },
});
export const openapi = createOpenAPI();
