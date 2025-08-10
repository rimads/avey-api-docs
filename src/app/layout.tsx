import "@/app/global.css";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Nunito } from "next/font/google";
import type { ReactNode } from "react";
import { baseOptions } from "./layout.config";
import { source } from "@/lib/source";
import ClientNav from "@/components/TopBar";
import { Provider } from "@/components/provider";
// Load Nunito with next/font to avoid render-blocking CSS
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--nunito",
  display: "swap",
});

export const dynamic = "error";
export const revalidate = false;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={nunito.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Provider>
          {" "}
          <DocsLayout
            sidebar={{
              prefetch: true,
            }}
            tree={source.pageTree}
            {...baseOptions}
          >
            <ClientNav />
            {children}
          </DocsLayout>
        </Provider>
      </body>
    </html>
  );
}
