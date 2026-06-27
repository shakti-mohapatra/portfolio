import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-6 overflow-hidden relative transition-colors duration-200">
      {/* Decorative blobs — same style as hero */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-indigo-100 dark:bg-indigo-900/30 blur-3xl opacity-60" />
        <div className="absolute -bottom-32 -left-32 w-[350px] h-[350px] rounded-full bg-violet-100 dark:bg-violet-900/30 blur-3xl opacity-50" />
      </div>

      <div className="relative text-center max-w-md">
        {/* Large decorative number */}
        <p
          className="text-[10rem] sm:text-[14rem] font-bold leading-none select-none
                     text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #ddd6fe 100%)",
          }}
          aria-hidden
        >
          404
        </p>

        <div className="-mt-6 sm:-mt-10 relative">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Page not found
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
            <br />
            Head back home to find what you need.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-8 px-7 py-3 bg-indigo-600 text-white font-semibold rounded-full
                       hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all
                       shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden>
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
