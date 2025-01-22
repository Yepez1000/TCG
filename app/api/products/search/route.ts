import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
    // Parse the query parameter from the request URL
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const query = searchParams.get('query');
    const sortOption = searchParams.get('sort') || '';

    
    const where: any = {
        isArchived: false,
      };
      
      if (query) {
        console.log('query is not null')
        where.OR = [
          { name: { contains: query } },
          { id: query },
        ];
      }
      
      if (category !== "all") {
        where.category = category;
      }
    

    let orderBy: Prisma.ProductOrderByWithRelationInput;

    if (sortOption === 'price-asc') {
        orderBy = { price: 'asc' };
    } else if (sortOption === 'price-desc') {
        orderBy = { price: 'desc' };
    } else if (sortOption === 'name-asc') {
        orderBy = { name: 'asc' };
    } else if (sortOption === 'name-desc') {
        orderBy = { name: 'desc' };
    } else {
        orderBy = { createdAt: 'desc' }; // Default to sorting by newest
    }

    const cards = await prisma.product.findMany({
        where,
        orderBy,
    });

    // Respond with the query (or process it as needed)
    return NextResponse.json(cards);
}