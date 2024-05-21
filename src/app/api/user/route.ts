import { NextRequest, NextResponse } from 'next/server';
import { createUser, retreiveData } from '@/lib/firebase/services';

// Handler untuk metode POST
export async function POST(req: NextRequest) {
    // return NextResponse.json({ status: 200, message:"User Created" });
    try {
        const body = await req.json();
        console.log(body);
        if (body) {
            createUser(body, (status:boolean) => {
                if (status) {
                    return NextResponse.json({ status: 200, message:"User Created", data: body });
                } else {
                    return NextResponse.json({ status: 401, data: 'Failed to create user' });
                }
            }); 
            return NextResponse.json({ status: 99, message:"falied", data: body });  
        } else {
            return NextResponse.json({ status: 404, data: 'Data not found' });
        }

    } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ status: 400, error: 'Invalid JSON' });
    }
}