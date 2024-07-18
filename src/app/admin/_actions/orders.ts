"use server";

import db from "@/lib/db";

import { notFound } from "next/navigation";

export const deleteOrder = async (id: string) => {
  const order = await db.order.delete({ where: { id: id } });

  if (!order) return notFound();

  return order;
};
