"use client";

import { formatCurrency } from "@/lib/formatters";
import { Product } from "@prisma/client";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { userOrderExists } from "@/app/actions/orders";

type Props = {
  product: Product;
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export const CheckoutForm = ({ product, clientSecret }: Props) => {
  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <div className="flex gap-4 items-center">
        <div className=" aspect-video flex-shrink-0 w-1/3 relative">
          <Image
            alt={product.name}
            src={product.imagePath}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg">
            {formatCurrency(product.priceInCents * 0.01)}
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
        </div>
      </div>

      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form priceInCents={product.priceInCents} id={product.id} />
      </Elements>
    </div>
  );
};

const Form = ({ priceInCents, id }: { priceInCents: number; id: string }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (stripe == null || elements == null || email == null) return;

    setIsLoading(true);

    // Check for existing order...

    const orderExists = await userOrderExists(email, id);

    if (orderExists) {
      setErrorMessage(
        "You have already purchased this product. Try downloading it"
      );
      setIsLoading(false);
    }

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An Unknown Error Occured");
        }
      })
      .finally(() => setIsLoading(false));
    //
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />

          <div className="mt-4">
            <LinkAuthenticationElement
              onChange={(e) => setEmail(e.value.email)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full "
            size="lg"
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading
              ? "Purchasing..."
              : `Purchase - ${formatCurrency(priceInCents * 0.01)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
