import { NextResponse } from 'next/server';
// PLAceholder for ML model predictions

export async function GET(
  request: Request,
  { params }: { params: Promise<{ symbol: string }> }  
) {
  try {
    const { symbol } = await params;
    
    const res = await fetch(
      `http://localhost:8000/api/predict/${symbol}`,
      { cache: 'no-store' }
    );
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'ML model not yet integrated' },
      { status: 501 }
    );
  }
}