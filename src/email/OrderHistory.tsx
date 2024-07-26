import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import OrderInformation from "./_components/OrderInformation";
import { Product } from "@prisma/client";
import OrdersPage from "@/app/admin/orders/page";

type Props = {
  orders: {
    id: string;
    createdAt: Date;
    pricePaidInCents: number;
    downloadVerificationId: string;
    product: {
      name: string;
      imagePath: string;
      description: string;
    };
  }[];
};

const OrderHistoryEmail = ({ orders }: Props) => {
  return (
    <Html>
      <Preview>Order History & Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={index}>
                <OrderInformation
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),

      createdAt: new Date(),
      pricePaidInCents: 696900,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product Name",
        imagePath:
          "/products/45272160-fdfb-4828-97ad-9817f70e3d25-stripelogo.png",
        description: "Product description",
      },
    },
    {
      id: crypto.randomUUID(),

      createdAt: new Date(),
      pricePaidInCents: 696900,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product Name",
        imagePath:
          "/products/45272160-fdfb-4828-97ad-9817f70e3d25-stripelogo.png",
        description: "Product description",
      },
    },
    {
      id: crypto.randomUUID(),

      createdAt: new Date(),
      pricePaidInCents: 696900,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product Name",
        imagePath:
          "/products/45272160-fdfb-4828-97ad-9817f70e3d25-stripelogo.png",
        description: "Product description",
      },
    },
    {
      id: crypto.randomUUID(),

      createdAt: new Date(),
      pricePaidInCents: 696900,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product Name",
        imagePath:
          "/products/45272160-fdfb-4828-97ad-9817f70e3d25-stripelogo.png",
        description: "Product description",
      },
    },
  ],
} satisfies Props;

export default OrderHistoryEmail;
