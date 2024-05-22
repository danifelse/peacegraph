import { NextRequest, NextResponse } from 'next/server';
import { createUser, retreiveData } from '@/lib/firebase/services';
import { User } from '@/models/User';

// Handler untuk metode POST
export async function POST(req: NextRequest) {
    try {
        const apiKey = req.headers.get('apiKey');
        const validApiKey = process.env.API_KEY;

        if (!apiKey || apiKey !== validApiKey) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data: User = await req.json();
        
        if (data) {
            const status = await createUser(data);
            if (status) {
                return NextResponse.json({ status: 200, message: 'User created successfully' });
            } else {
                return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 400, headers: { 'Content-Type': 'application/json' }});
            }
        }   
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
}