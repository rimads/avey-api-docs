import "@/app/global.css";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { baseOptions } from "./layout.config";
import { source } from "@/lib/source";
import ClientNav from "@/components/TopBar";
import { Provider } from "@/components/provider";
const inter = Inter({
  subsets: ["latin"],
});

export const dynamic = "error";
export const revalidate = false;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Provider>
          {" "}
          <DocsLayout tree={source.pageTree} {...baseOptions}>
            <ClientNav />
            {children}
          </DocsLayout>
        </Provider>
      </body>
    </html>
  );
}
