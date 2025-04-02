import { NextResponse } from 'next/server';

let enrollmentCount = 50; // Starting count
const TOTAL_SPOTS = 50;

export async function GET() {
  return NextResponse.json({ 
    remaining: enrollmentCount,
    total: TOTAL_SPOTS,
    isFull: enrollmentCount <= 0 
  });
}

export async function POST() {
  if (enrollmentCount > 0) {
    enrollmentCount--;
    return NextResponse.json({ 
      remaining: enrollmentCount,
      total: TOTAL_SPOTS,
      isFull: enrollmentCount <= 0 
    });
  }
  
  return NextResponse.json({ 
    error: "No spots remaining",
    remaining: 0,
    total: TOTAL_SPOTS,
    isFull: true 
  }, { status: 400 });
}
