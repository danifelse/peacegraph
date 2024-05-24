import { getJSON } from "@/lib/firebase/servicejson";
import { ImageData } from "@/models/ImageData";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const slug = params.slug;

    try {
        const data  = await getJSON("images");
        const imagesData : ImageData[] = JSON.parse(data.imageData);
        
        const imageData = imagesData.find((image: ImageData) => image.slug === slug);

        if (!imageData) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        return NextResponse.json({ status: 200, message: "Success", data: imageData });
    } catch (error) {
        console.error("Error fetching data from Firestore", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
