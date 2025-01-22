import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';


export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const sortOption = searchParams.get('sort') || '';

    console.log("this is sort option", sortOption)

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

    const products = await prisma.product.findMany({
        orderBy,
        where: {
            isArchived: false,
        }
    });
    return NextResponse.json(products);
}
