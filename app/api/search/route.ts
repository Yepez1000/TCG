import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
    // Parse the query parameter from the request URL
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    const sortOption = searchParams.get('sort') || '';



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

   
    if (!query) {
        return NextResponse.json({ error: 'No query provided' }, { status: 400 });
    }


    const cards = await prisma.product.findMany({
        where: {
            OR: [
                query ? { name: { contains: query } } : {},
                query ? { id: query } : {},  // Exact match for ID
            ],
            isArchived: false,
        },
        orderBy,
    });

    // Respond with the query (or process it as needed)
    return NextResponse.json(cards);
}