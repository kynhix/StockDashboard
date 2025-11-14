import { NextResponse } from 'next/server';

// to fastapi for individual stock details
export async function GET(
  request: Request,
  { params }: { params: Promise<{ symbol: string }> } 
) {
  try {
    const { symbol } = await params;  
    const res = await fetch(`http://localhost:8000/api/stock/${symbol}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Stock not found');
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Stock not found' },
      { status: 404 }
    );
  }
}