import { CheckoutForm } from "@/components/forms/CheckoutForm";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type Props = {
  params: { id: string };
};

const PurchasePage = async ({ params: { id } }: Props) => {
  const product = await db.product.findUnique({ where: { id: id } });

  if (!product) return notFound();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "USD",
    metadata: { productId: product.id },
  });

  if (paymentIntent.client_secret == null) {
    throw new Error("Stripe failed to create payment intent");
  }

  return (
    <CheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  );
};

export default PurchasePage;
