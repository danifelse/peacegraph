import { createCategory, retreiveData } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized'  }, { status: 401 });
    }
    const data = await retreiveData("categories");
    return NextResponse.json({ status: 200, message:"Success", data: data }); 
}

export async function POST(req: NextRequest){
    try {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized'  }, { status: 401 });
    }

    const data = await req.json();
    if (data) {
        const status = await createCategory(data);
        if (status) {
            return NextResponse.json({ status: 200, message: 'Category created successfully' });
        } else {
            return new Response(JSON.stringify({ error: 'Category already exists' }), { status: 400, headers: { 'Content-Type': 'application/json' }});
        }

    } else { 
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' }});
    }
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 400, headers: { 'Content-Type': 'application/json' }});
    }
}
