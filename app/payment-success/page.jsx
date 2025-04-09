// app/success/page.tsx
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Payment Successful
        </h1>
        <p className="text-gray-600 mb-6">
          Your transaction has been completed successfully. You will receive a confirmation shortly.
        </p>
        <div className="grid sm:grid-cols-2 gap-8 w-full">
          <Link
            href="/pricing-suggestion"
            className="inline-block bg-blue-700 sm:w-[110%] hover:bg-blue-800 text-white font-medium my-6 sm:mt-0 py-3 sm:py-2 px-6 rounded-lg transition"
          >
            Try the calculator
          </Link>
          <Link
            href="/"
            className="inline-block bg-blue-600 sm:w-[90%] sm:left-[10%] hover:bg-blue-700 text-white font-medium relative top-4 sm:top-0 py-1 sm:py-2 px-6 rounded-lg transition"
          >
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}
