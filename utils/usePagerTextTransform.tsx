// components/PagerTextTransformer.tsx
"use client";
import { useEffect } from "react";

export function PagerTextTransformer() {
  useEffect(() => {
    const updatePagerText = () => {
      const links = document.querySelectorAll("p");
      links.forEach((link) => {
        const text = link.textContent?.trim();
        if (text === "Previous Page") link.textContent = "Previous page";
        if (text === "Next Page") link.textContent = "Next page";
      });
    };

    updatePagerText();

    const observer = new MutationObserver(updatePagerText);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null; // This component renders nothing
}
