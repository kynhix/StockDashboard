'use client'

import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";


export default function Prediction(props: { prediction: string }) {
  const color = props.prediction === 'Buy' ? 'bg-green-100' : 'bg-red-100';
  const text = props.prediction === 'Buy' ? 'text-green-900' : 'text-red-900';
  const Arrow = props.prediction === 'Buy' ? ArrowUp : ArrowDown;

  return <div className={cn(color, text, 'text-3xl p-4 mt-5 flex justify-center gap-2')}> <Arrow size={32} /> {props.prediction}</div>
}
