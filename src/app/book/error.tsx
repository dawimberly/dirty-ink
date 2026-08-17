"use client";

export default function BookError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0c0a09] px-4 text-[#f2ebe0]">
      <div className="max-w-sm text-center">
        <p className="text-lg font-medium">Something went wrong</p>
        <p className="mt-2 text-sm text-[#f2ebe0]/60">
          The booking form hit an error. Try again in a moment.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg border border-[#f2ebe0]/20 px-4 py-2 text-sm"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
