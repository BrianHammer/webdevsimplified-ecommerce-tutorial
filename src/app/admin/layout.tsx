import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { Nav, NavLink } from "@/components/globals/Nav";

// DO NOT CACHE ANY ADMIN PAGES!
// 1. Good internet speed on admin pages
// 2. Refresh gives up to date values
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Storefront",
  description: "webdevsimplified ecommerce tutorial",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Users</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}
