import { NextResponse } from 'next/server';

// to fastapi backend for trending stocks
export async function GET() {
  try {
    const res = await fetch('http://localhost:8000/api/stocks', {
      cache: 'no-store'  //  get fresh data
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch stocks');
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stocks' },
      { status: 500 }
    );
  }
}