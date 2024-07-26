import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import OrderInformation from "./_components/OrderInformation";
import { Product } from "@prisma/client";

type Props = {
  product: {
    name: string;
    imagePath: string;
    description: string;
  };
  order: { id: string; createdAt: Date; pricePaidInCents: number };
  downloadVerificationId: string;
};

const PurchaseReceiptEmail = ({
  product,
  order,
  downloadVerificationId,
}: Props) => {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: "Product Name",
    description: "Product Description",
    imagePath: "/products/45272160-fdfb-4828-97ad-9817f70e3d25-stripelogo.png",
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 696900,
  },
  downloadVerificationId: crypto.randomUUID(),
} satisfies Props;

export default PurchaseReceiptEmail;
