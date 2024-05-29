import { deleteUser, getUserDetails, retreiveDataBySlug, updateUser } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE( req: NextRequest, { params }: { params: { id: string } } ) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY 

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized'  }, { status: 401 });
    }

    const id = params.id
    const status = await deleteUser(id);

    if (status) {
        return NextResponse.json({ status: 200, message: 'User deleted successfully' });
    } else {
        return new Response(JSON.stringify({ error: 'Failed to delete User' }), { status: 404, headers: { 'Content-Type': 'application/json' }});
    }
}

export async function GET( req: NextRequest, { params }: { params: { id: string } } ) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY 

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized'  }, { status: 401 });
    }

    const id = params.id
    const data = await getUserDetails(id);
    if (data) {
        return NextResponse.json({ status: 200, message:"Success", data: data });
    } else {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' }});
    }
}

export async function PUT ( req: NextRequest, { params }: { params: { id: string } } ) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY 
    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const id = params.id
    const newData = await req.json();
    const status = await updateUser(id, newData);
    if (status) {
        return NextResponse.json({ status: 200, message: 'User updated successfully', data: newData });
    } else {
        return new Response(JSON.stringify({ error: 'Failed to update user' }), { status: 404, headers: { 'Content-Type': 'application/json' }});
    }
}   