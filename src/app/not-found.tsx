import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-center">
      <p className="text-sm font-semibold text-gray-500">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 text-gray-600">
        The page you’re looking for doesn’t exist. It may have been moved or
        removed.
      </p>
      <div className="mt-8">
        <Link href="/" className="text-av-blue900 underline" prefetch={true}>
          Go back home
        </Link>
      </div>
    </main>
  );
}
