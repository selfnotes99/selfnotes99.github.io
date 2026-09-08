"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong!</h2>
      <p className="text-xs text-gray-500 mb-6 max-w-sm">
        We encountered an unexpected error while preparing this experience.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 bg-[#064B35] text-white text-xs font-bold rounded-lg"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 bg-gray-100 text-gray-800 text-xs font-bold rounded-lg"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
