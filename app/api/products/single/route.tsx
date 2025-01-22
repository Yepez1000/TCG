import { NextResponse, NextRequest } from "next/server";
import { prisma} from "@/lib/prisma";



export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query){
        throw new Error('Product does not exist')
    }
    const product = await prisma.product.findUnique({
        where :{
            id : query
        }
    });

    return NextResponse.json(product)
}