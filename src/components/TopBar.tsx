// app/components/ClientNav.tsx
"use client";
import Link from "next/link";

export default function ClientNav() {
  return (
    <div className="flex items-center  justify-end space-x-4 p-3 mr-4">
      <Link
        href="https://avey.ai/contact-us"
        className="text-fd-muted-foreground"
      >
        Support
      </Link>

      <Link
        href="/login"
        className="flex items-center  gap-1   text-sm font-medium bg-fd-primary text-white dark:text-black pl-4 pr-2  py-1 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300"
      >
        Dashboard
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.46984 7.46984C9.74445 7.19524 10.1792 7.17778 10.4737 7.41809L10.5304 7.46984L14.5304 11.4698L14.5821 11.5265C14.8225 11.8211 14.805 12.2558 14.5304 12.5304L10.5304 16.5304C10.2375 16.8233 9.76274 16.8233 9.46984 16.5304C9.17695 16.2375 9.17695 15.7627 9.46984 15.4698L12.9396 12.0001L9.46984 8.53039L9.41809 8.47375C9.17778 8.17917 9.19524 7.74445 9.46984 7.46984Z"
            fill="currentColor"
          />
        </svg>
      </Link>
    </div>
  );
}
