
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    try{
        const data = await req.json();

        const { name, description, image, price, stock, category, link , priceId} = data;

        console.log('this is data', data);


        const product = await prisma.product.create({
            data: {
                name: name,
                description: description,
                imageUrl: link,
                price: parseFloat(price),
                stock: parseInt(stock),
                category: category,
                priceId: priceId,
            }

        });

        return NextResponse.json(product);

        
    }
    catch (error) {
        console.error('Error adding product:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

}