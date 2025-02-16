
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const {data} = await req.json();
        console.log("create prisma data",data)





        

        const product = await prisma.product.create({
            data: {
                id: data.id,
                name: data.cardName,
                imageUrl: data.link,
                expansionName: data.expansion,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
                category: data.category,
                priceId: data.priceId,
                condition: data.condition,
                pokemon: {
                    connect: {id: data.pokemonId}
                }
            }

        });

        return NextResponse.json(product);

        
    }
    catch (error) {
        console.error('Error adding product:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        console.log('this is id', id);
        const cartproduct = await prisma.cartItem.deleteMany({
            where: {
                productId: id
            }
        })
        const product = await prisma.product.deleteMany({
            where: {
                id: id,
            },
        });
        return NextResponse.json(product);
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}