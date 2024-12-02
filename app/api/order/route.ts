import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const userId = session.user?.id;

        if (userId === process.env.SUPERUSER){
            const orders = await prisma.order.findMany();
            return NextResponse.json(orders);
        }

        const orders = await prisma.order.findMany({
            where: userId ? { userId } : {},
        });

        console.log('this is orders', orders)

        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { orderId, status } = body;

        if (!orderId || !status) {
            return NextResponse.json({ error: "Order ID and status are required" }, { status: 400 });
        }

        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: { status },
        });

        return NextResponse.json(updatedOrder);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
    }
}