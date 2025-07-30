"use client";

import { useEffect } from "react";

export default function AdminPage() {
  useEffect(() => {
    // Configure CMS before loading
    (window as any).CMS_MANUAL_INIT = true;

    // Load Decap CMS script
    const script = document.createElement("script");
    script.src = "https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js";
    script.async = true;

    script.onload = () => {
      // Environment-based configuration
      const isDevelopment = true;
      // window.location.hostname !== "localhost" &&
      // window.location.hostname !== "127.0.0.1";

      const config = {
        backend: isDevelopment
          ? {
              // LOCAL DEVELOPMENT: Use proxy server (no authentication needed)
              name: "proxy",
              proxy_url: "http://localhost:8081/api/v1",
            }
          : {
              // PRODUCTION: Use GitHub (authentication required)
              name: "github",
              repo: "rimads/avey-api-docs",
              branch: "main",
            },
        media_folder: "public/uploads",
        public_folder: "/uploads",
        // publish_mode: "editorial_workflow",
        collections: [
          {
            name: "docs",
            label: "Documentation",
            folder: "content/docs",
            extension: "mdx",
            format: "frontmatter",
            create: true,
            slug: "{{slug}}",
            fields: [
              {
                name: "title",
                label: "Title",
                widget: "string",
                required: true,
                hint: "The page title that appears in navigation and browser tab",
              },
              {
                name: "description",
                label: "Description",
                widget: "string",
                required: true,
                hint: "Brief description for SEO and page previews",
              },
              {
                name: "icon",
                label: "Icon",
                widget: "string",
                required: false,
                hint: 'Optional icon name for the page (e.g., "book", "settings")',
              },
              {
                name: "full",
                label: "Full Width",
                widget: "boolean",
                required: false,
                default: false,
                hint: "Enable full-width layout for this page",
              },
              {
                name: "index",
                label: "Show in Search Index",
                widget: "boolean",
                required: false,
                default: true,
                hint: "Whether this page should appear in search results",
              },
              {
                name: "body",
                label: "Content",
                widget: "markdown",
                hint: "Supports MDX syntax including <Cards>, <Card>, code blocks, and other components",
              },
            ],
            editor: {
              preview: true,
            },
          },
        ],
      };

      // Initialize CMS with environment-appropriate backend
      (window as any).CMS.init({ config });
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return <div id="nc-root">{/* Decap CMS will render here */}</div>;
}
