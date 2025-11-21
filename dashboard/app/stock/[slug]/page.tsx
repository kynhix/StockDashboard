'use client'

import StockInfo from "@/components/StockInfo";
import { use } from "react";

export default function StockPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params);

  return (<main className="flex-1">
    <StockInfo symbol={slug} />
  </main>);
}
