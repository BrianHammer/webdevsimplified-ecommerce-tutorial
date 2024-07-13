import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

type DashboardCardProps = {
  title: string;
  subTitle: string;
  body: string;
};

const DashboardCard = ({ title, subTitle, body }: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>

      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
};

const getSalesData = async () => {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  await wait(2000);

  return {
    amount: (data._sum.pricePaidInCents || 0) * 0.01,
    numberOfSales: data._count,
  };
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getUserData = async () => {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  const averageValuePerUser =
    userCount === 0
      ? 0
      : ((orderData._sum.pricePaidInCents || 0) * 0.01) / userCount;

  return {
    userCount,
    averageValuePerUser,
  };
};

const getProductData = async () => {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return { activeCount, inactiveCount };
};

const AdminPage = async () => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Revenue"
        subTitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Customer"
        subTitle={`${formatCurrency(
          userData.averageValuePerUser
        )} Average Value`}
        body={`${formatNumber(userData.userCount)}`}
      />
      <DashboardCard
        title="Active Products"
        subTitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={`${formatNumber(productData.activeCount)}`}
      />
    </div>
  );
};

export default AdminPage;
