import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';


export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const sortOption = searchParams.get('sort') || '';

    const [field, direction] = sortOption.split('-');

    const orderBy: Prisma.ProductOrderByWithRelationInput = field 
        ? { [field]: direction }
        : { createdAt: 'desc' }; // Default to sorting by newest

    const products = await prisma.product.findMany({
        orderBy,
        where: {
            isArchived: false,
        }
    });
    return NextResponse.json(products);
}
