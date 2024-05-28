import { getJSON, updateJSON } from "@/lib/firebase/servicejson";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const data  = await getJSON("articles");
        const articlesData = JSON.parse(data.articlesData);

        if (!articlesData) {
            return NextResponse.json({ error: 'Articles not found' }, { status: 404 });
        }

        return NextResponse.json({ status: 200, message: "Success", data: articlesData });
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
        const data  = await getJSON("articles");
        const articlesData : any  = JSON.parse(data.articlesData);
        const newData = await req.json();

        const isExist = articlesData.find((article : any) => article.slug === newData.slug);
        if (isExist) {
            return NextResponse.json({ error: `Ups, ${newData.title} already exist` }, { status: 409 });
        }

        articlesData.push(newData);
        data.articlesData = JSON.stringify(articlesData);
        if (newData) {
            await updateJSON("articles" , data );
            return NextResponse.json({ status: 200, message: `${newData.title} created successfully` , data: newData });
        }

        return NextResponse.json({ error: 'Data not found' }, { status: 404 });

    } catch (error) {
        console.error("Error fetching data from Firestore", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}