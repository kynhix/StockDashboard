import { NextResponse } from 'next/server';
// to fastapi for chart
export async function GET(
  request: Request,
  { params }: { params: Promise<{ symbol: string }> } 
) {
  try {
    const { symbol } = await params;
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || '3mo';
    
    const res = await fetch(`http://localhost:8000/api/chart/${symbol}?period=${period}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Chart data not found');
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch chart data' },
      { status: 404 }
    );
  }
}
