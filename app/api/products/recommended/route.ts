import { NextResponse, NextRequest } from "next/server";
import { prisma} from "@/lib/prisma";


export async function GET(request: NextRequest) {
    const products = await prisma.product.findMany({
        take: 3,
        orderBy: {
            createdAt: 'desc',
        },
        where:{
            isArchived: false,
        }
    })


    return NextResponse.json(products)
}