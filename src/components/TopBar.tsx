// app/components/ClientNav.tsx
"use client";
import Link from "next/link";

export default function ClientNav() {
  return (
    <div className="flex items-center  justify-end space-x-4 p-3">
      <Link
        href="/login"
        className="text-sm font-medium bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200"
      >
        Dashboard
      </Link>
    </div>
  );
}
