"use client";

import CheckoutPage from "../components/CheckoutPage";
import convertToSubcurrency from "../lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const amount = 4.99;

  return (
    <main className="w-[100vw] sm:px-24 mx-auto overflow-x-hidden p-2 sm:p-10 text-white text-center border rounded-md bg-gradient-to-tr from-blue-600 to-purple-600">
      <div className="mb-14">
        <h1 className="text-4xl font-extrabold mb-2">Business Tier</h1>
        <h2 className="text-2xl">
          <span className="font-bold"> £{amount}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "gbp",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </main>
  );
}
