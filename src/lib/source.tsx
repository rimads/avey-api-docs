import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createOpenAPI, attachFile } from "fumadocs-openapi/server";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/",
  source: docs.toFumadocsSource(),
  pageTree: {
    attachFile(node, file) {
      if (!file) return node;

      const data = file.data;
      if (data.sidebar_title) {
        node.name = data.sidebar_title;
      }

      node.name = (
        <>
          <span className="flex justify-between w-full items-center -pr-8">
            {node.name}

            {data.new && (
              <span className="ml-1 text-white  rounded-full bg-av-blue-900 px-2.5 py-0.5 text-xs font-medium text-right">
                NEW
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
