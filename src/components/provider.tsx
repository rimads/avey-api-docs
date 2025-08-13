import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import SearchDialog from "@/components/search";
import { PagerTextTransformer } from "utils/usePagerTextTransform";

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{
        SearchDialog,
      }}
    >
      <PagerTextTransformer />
      {children}
    </RootProvider>
  );
}
