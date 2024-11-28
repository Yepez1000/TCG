import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {email} = await req.json();

  

    if(email === process.env.SUPERUSER){
        return NextResponse.json({isSuperUser: true});
    }

    return NextResponse.json({ isSuperUser: false});
}