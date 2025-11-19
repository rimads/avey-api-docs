import { docs } from "@/.source";
import {
  loader,
  type PageFile,
  type PageData,
  type MetaFile,
  type MetaData,
} from "fumadocs-core/source";
import { createOpenAPI, attachFile } from "fumadocs-openapi/server";
import type { PageTree } from "fumadocs-core/server";

interface CustomPageData extends PageData {
  sidebar_title?: string;
  new?: string;
}

interface CustomMetaData extends MetaData {
  new?: string;
}

type CustomPageFile = PageFile<CustomPageData>;
type CustomMetaFile = MetaFile<CustomMetaData>;

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/",
  source: docs.toFumadocsSource(),
  pageTree: {
    attachFile: (node: PageTree.Item, file?: CustomPageFile) => {
      if (!file) return node;

      const data = file.data;
      if (data.sidebar_title) {
        node.name = data.sidebar_title;
      }

      if (data.new) {
        const originalName = node.name;
        node.name = (
          <span
            key={file.path}
            className="flex justify-between w-full items-center -pr-8"
          >
            {originalName}
            <span className="ml-1 text-white rounded-full bg-av-blue600 dark:bg-av-blue900 px-2.5 py-0.5 text-xs font-medium text-right">
              {data.new}
            </span>
          </span>
        );
      }

      return attachFile(node, file);
    },
    attachFolder: (
      node: PageTree.Folder,
      folder: { children: (CustomPageFile | CustomMetaFile)[] },
      meta?: CustomMetaFile
    ) => {
      if (meta?.data.new) {
        const originalName = node.name;
        node.name = (
          <span
            key={meta.path}
            className="flex justify-between w-full items-center -pr-8"
          >
            {originalName}
            <span className="ml-1 text-white rounded-full bg-av-blue600 dark:bg-av-blue900 px-2.5 py-0.5 text-xs font-medium text-right">
              {meta.data.new}
            </span>
          </span>
        );
      }
      return node;
    },
  },
});
export const openapi = createOpenAPI();
