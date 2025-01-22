import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(req:Request){
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('s')

    if (!query) {
        return NextResponse.json({error: "No session id found"})
    }

    const order = await prisma.order.findMany({
        where: {
            sessionId: query,
        },
        include: {
            orderItems: {
              include: {
                product: true, // Include product details in order items
              },
            },
          },
    })
    console.log('API order sessionid', order)
    
    return NextResponse.json(order);
}