import { NextRequest, NextResponse } from "next/server";
if (process.env.STRIPE_SECRET_KEY === undefined) {
  console.error("KJSADHSAJDJ")
}
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();
    const customer = await stripe.customers.create({ email });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: process.env.PRICE_ID,
        },
      ],
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error", error);

    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
