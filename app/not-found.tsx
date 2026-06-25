import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-6">
      <div className="text-center">
        <p className="text-7xl font-bold text-indigo-600 dark:text-indigo-400">404</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-7 py-3 bg-indigo-600 text-white font-semibold rounded-full
                     hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all
                     shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
