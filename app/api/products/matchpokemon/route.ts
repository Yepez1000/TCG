
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
    // Parse the query parameter from the request URL
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');
    const expansion = searchParams.get('expansion');
    const category = searchParams.get('category')

    const tableMap: Record<string, any> = {
        // "one-piece": prisma.onePiece,
        "Pokemon": prisma.pokemon, // Default
        // "yugioh": prisma.yugioh, // Example for other categories
    };

    if (!category || !(category in tableMap)) {
        return NextResponse.json([])
    }
    
    
    const model = tableMap[category || "pokemon"]; // Default to "pokemon" if no category
    


    
    const where: any = {}

      
    if (name) {
        where.name = {
            startsWith: name, // Matches records where 'name' starts with the input
        };
    }
    
    if (expansion) {
        where.expansionName = {
            startsWith: expansion,
        };
    }

    const items = await model.findMany({
        where,
        take: 6,
    });

    return NextResponse.json(items);

    
    
}


