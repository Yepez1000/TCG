import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { image } = await req.json(); // Ensure this aligns with the data sent from the client

        const formData = new FormData();
        formData.append('image', image);
        formData.append('type', 'base64');


        // Uncomment and ensure the environment variable is set correctly for external API call
        const response = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            },
            body: formData,
        });
        
        if (!response.ok) {
            throw new Error(`Imgur API responded with ${response.status}`);
        }
        
        const result = await response.json();  

        console.log(result)

    
        return NextResponse.json(result.data?.link);

    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}
