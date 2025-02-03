import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
    // Parse the query parameter from the request URL
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || null;
    const query = searchParams.get('query');
    const sortOption = searchParams.get('sort') || '';

    
    const where: any = {
        isArchived: false,
      };
      
    if (query) {
      where.name = query
    }
    
    if (category !== "all") {
      where.category = category;
    }

    const [field, direction] = sortOption.split('-')
    const orderBy: Prisma.ProductOrderByWithRelationInput = field 
        ? { [field]: direction }
        : { createdAt: 'desc' }; // Default to sorting by newest


    const cards = await prisma.product.findMany({
        where,
        orderBy,
    });

    // Respond with the query (or process it as needed)
    return NextResponse.json(cards);
}