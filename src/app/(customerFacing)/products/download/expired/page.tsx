import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ExpiredPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Download link expired</h1>
      <Button className=" " asChild size={"lg"}>
        <Link href="/orders">Get New Link</Link>
      </Button>
    </div>
  );
};

export default ExpiredPage;
