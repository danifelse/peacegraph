import { getJSON, updateJSON } from "@/lib/firebase/servicejson";
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

export async function PUT (req: NextRequest, { params }: { params: { slug: string } }) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const slug = params.slug;
    const newData = await req.json();
    console.log(newData);
    const data  = await getJSON("images");
    const imagesData : ImageData[] = JSON.parse(data.imageData);

    const imageData = imagesData.find((image: ImageData) => image.slug === slug);
    if (!imageData) {
        return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    imagesData[imagesData.indexOf(imageData)] = newData;
    data.imageData = JSON.stringify(imagesData);
    try {
        const status = await updateJSON("images", "images", data);
        if (status) {
            return NextResponse.json({ status: 200, message: 'Image updated successfully', data: newData });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to update image' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
    } catch (error) {
        console.error("Error updating data in Firestore", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
