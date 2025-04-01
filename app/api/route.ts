import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'Pricing Guru API',
    version: '1.0.0',
  });
}