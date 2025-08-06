import "@/app/global.css";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { baseOptions } from "./layout.config";
import { source } from "@/lib/source";
import ClientNav from "@/components/TopBar";
import { Banner } from "fumadocs-ui/components/banner";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* <Banner
          // changeLayout={false}
          height="40px"
        >
          Access our playground from here:{" "}
          <Link
            href="https://avey.ai/playground"
            className="bg-fd-primary text-fd-background px-2 py-1 ml-2 rounded-md hover:bg-fd-primary/80"
          >
            Playground
          </Link>
        </Banner> */}
        <RootProvider>
          {" "}
          <DocsLayout
            tree={source.pageTree}
            {...baseOptions}
            sidebar={{
              tabs: {
                transform: (option, node) => ({
                  ...option,

                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-book-open"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  ),
                }),
              },
            }}
          >
            <ClientNav />
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
