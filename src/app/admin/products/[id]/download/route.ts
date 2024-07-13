import db from "@/lib/db";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

import fs from "fs/promises";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const product = db.product.findUnique({
    where: { id },
    select: { filePath: true },
  });

  if (!product) return notFound();

  const size = await fs;
}
