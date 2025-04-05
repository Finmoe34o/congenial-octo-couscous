// app/success/page.tsx
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Payment Successful
        </h1>
        <p className="text-gray-600 mb-6">
          Your transaction has been completed successfully. You will receive a confirmation shortly.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}
