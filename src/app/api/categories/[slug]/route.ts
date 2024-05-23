import { retreiveDataBySlug, updateCategory } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;
    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const slug = params.slug;
    const data = await retreiveDataBySlug("categories", slug);
    if (!data) {
        return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    return NextResponse.json({ status: 200, message:"Success", data: data });
}

export async function PUT ( req: NextRequest, { params }: { params: { slug: string } } ) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;
    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const slug = params.slug;
    const newData = await req.json();
    const status = await updateCategory(slug, newData);
    if (status) {
        return NextResponse.json({ status: 200, message: 'Category updated successfully', data: newData });
    } else {
        return new Response(JSON.stringify({ error: 'Failed to update category' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
}