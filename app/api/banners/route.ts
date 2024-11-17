import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const banners = await prisma.banner.findMany();
    return NextResponse.json(banners);
}