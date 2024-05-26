import { getJSON, updateJSON } from "@/lib/firebase/servicejson";
import { ImageData } from "@/models/ImageData";
import { NextRequest, NextResponse } from "next/server";

import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), '/src/data/images.json');

// using json data 

export async function GET(req: NextRequest, ) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const data  = await fsPromises.readFile(dataFilePath, 'utf8');
        const imagesData : ImageData[] = JSON.parse(data);
        
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
        const data  = await fsPromises.readFile(dataFilePath, 'utf8');
        console.log(data)
        const imagesData : ImageData[] = JSON.parse(data);
        const newData = await req.json();
        
        if (newData) {
            imagesData.push(newData);
            const updatedImages = JSON.stringify(imagesData);
            await fsPromises.writeFile(dataFilePath, updatedImages);
            return NextResponse.json({ status: 200, message: "Success", data: newData });
        }

        return NextResponse.json({ error: 'Data not found' }, { status: 404 });

    } catch (error) {
        console.error("Error fetching data from Firestore", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}