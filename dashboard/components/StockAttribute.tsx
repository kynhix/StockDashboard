'use client'

export default function StockAttribute(props: { name: string, attribute: string | number }) {
  return <div className="w-60 flex justify-between border-b">
    <span className="opacity-70 font-mono">{props.name}</span>
    <span className="font-mono">{props.attribute}</span>
  </div>
}
