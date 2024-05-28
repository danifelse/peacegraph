import { getJSON, updateJSON } from "@/lib/firebase/servicejson";
import { ImageData } from "@/models/ImageData";
import { NextRequest, NextResponse } from "next/server";


// using json data 

export async function GET(req: NextRequest, ) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const data  = await getJSON("images");
        const imagesData : ImageData[] = JSON.parse(data.imagesData);

        if (!imagesData) {
            return NextResponse.json({ error: 'Images not found' }, { status: 404 });
        }

        return NextResponse.json({ status: 200, message: "Success", data: imagesData });
    } catch (error) {
        console.error("Error fetching data from Firestore", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function POST(req: NextRequest  ) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const data  = await getJSON("images");
        const imagesData : ImageData[] = JSON.parse(data.imagesData);
        const newData = await req.json();

        if (newData) {
            imagesData.push(newData);
            data.imageData = JSON.stringify(imagesData);
            await updateJSON("images" , data );
            return NextResponse.json({ status: 200, message: "Success", data: newData });
        }

        return NextResponse.json({ error: 'Data not found' }, { status: 404 });

    } catch (error) {
        console.error("Error fetching data from Firestore", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}