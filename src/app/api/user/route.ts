import { NextRequest, NextResponse } from 'next/server';
import { createUser, retreiveData } from '@/lib/firebase/services';

// Handler untuk metode POST
export async function POST(req: NextRequest) {
    // return NextResponse.json({ status: 200, message:"User Created" });
    try {
        const body = await req.json();
        const {status, message} = await createUser(body);

        return NextResponse.json({ status, message });

    } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ status: 400, error: 'Invalid JSON' });
    }
}