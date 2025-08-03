// app/components/ClientNav.tsx
"use client";
import Link from "next/link";

export default function ClientNav() {
  return (
    <div className="flex items-center  justify-end space-x-4 p-3">
      <Link
        href="/login"
        className="text-sm font-medium bg-black text-white px-4 py-1.5 rounded hover:bg-gray-800 "
      >
        Dashboard
      </Link>
    </div>
  );
}
