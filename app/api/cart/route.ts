import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";



export async function POST(req: Request) {
    try {
        const { productId, action } = await req.json();
        const session = await getServerSession(authOptions); // Ensure user authentication

        console.log('session', session, 'productId', productId, 'action', action);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const userId = session.user.id ;

        const cart = await prisma.cart.findUnique({
            where: { userId },
        });

        if (!cart) {
            throw new Error("Cart not found for the user.");
        }

        const cartId = cart.id;

        const existingItem = await prisma.cartItem.findUnique({
            where: { cartId_productId: { cartId, productId } },
        });

        

        if (action === "add") {
            if (existingItem) {
                // Increment quantity
                await prisma.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity: existingItem.quantity + 1 },
                });
            } else {
                // Add new item
                await prisma.cartItem.create({
                    data: {
                        cartId,
                        productId,
                        quantity: 1,
                    },
                });
            }
        } else if (action === "remove") {
            if (existingItem && existingItem.quantity > 1) {
                // Decrement quantity
                await prisma.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity: existingItem.quantity - 1 },
                });
            } else if (existingItem) {
                // Remove item if quantity is 1
                await prisma.cartItem.delete({ where: { id: existingItem.id } });
            }
        }

        const updatedCart = await prisma.cartItem.findMany({ where: { cartId } });
        return NextResponse.json({ items: updatedCart });
    } catch (error) {
        console.error("Error updating cart:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { productId } = await req.json();
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const userId = session.user.id;

        const cart = await prisma.cart.findUnique({
            where: { userId },
        });

        if (!cart) {
            throw new Error("Cart not found for the user.");
        }

        const cartId = cart.id;

        const existingItem = await prisma.cartItem.findUnique({
            where: { cartId_productId: { cartId, productId } },
        });



       
        if(existingItem){
            await prisma.cartItem.deleteMany({
                where: { id: existingItem.id },
            });
        }
     

        const updatedCart = await prisma.cartItem.findMany({ where: { cartId } });
        return NextResponse.json({ items: updatedCart });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {


        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const userId = session.user.id;


        const cart = await prisma.cartItem.findMany({
            where: { cart: { userId } },
            include: { product: true }, // Include product details
        });


        return NextResponse.json({ items: cart });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}