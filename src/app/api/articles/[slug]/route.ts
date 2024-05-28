import { getJSON, updateJSON } from "@/lib/firebase/servicejson";
import { Article } from "@/models/Articles";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const slug = params.slug;
    try {
        const data = await getJSON("articles");
         console.log(data)
        const articlesData : Article[] = JSON.parse(data.articlesData);
        const articleData = articlesData.find((article: Article) => article.slug === slug);
        if (!articleData) {
            return NextResponse.json({ error: 'article not found' }, { status: 404 });
        }
        return NextResponse.json({ status: 200, message: "Success", data: articleData });
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
    const data  = await getJSON("articles");
    const articlesData : Article[] = JSON.parse(data.articlesData);

    const articleData = articlesData.find((article: Article) => article.slug === slug);
    if (!articleData) {
        return NextResponse.json({ error: 'article not found' }, { status: 404 });
    }

    articlesData[articlesData.indexOf(articleData)] = newData;
    data.articlesData = JSON.stringify(articlesData);
    try {
        const status = await updateJSON("articles", data);
        if (status) {
            return NextResponse.json({ status: 200, message: 'article updated successfully', data: newData });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to update article' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
    } catch (error) {
        console.error("Error updating data in Firestore", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function DELETE (req: NextRequest, { params }: { params: { slug: string } }) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const slug = params.slug;
    const data  = await getJSON("articles");
    const articlesData : Article[] = JSON.parse(data.articlesData);
    const article = articlesData.find((article: Article) => article.slug === slug);
    if (!article) {
        return NextResponse.json({ error: 'article not found' }, { status: 404 });
    }
    articlesData.splice(articlesData.indexOf(article), 1);
    data.articlesData = JSON.stringify(articlesData);
    try {
        const status = await updateJSON( "articles", data);
        if (status) {
            return NextResponse.json({ status: 200, message: `${article.title} deleted successfully` });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to delete categpry' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
    } catch (error) {
        console.error("Error deleting data in Firestore", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}