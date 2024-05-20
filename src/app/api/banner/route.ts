import { NextRequest, NextResponse } from 'next/server';
import { retreiveData } from '@/lib/firebase/services';

// Handler untuk metode GET
export async function GET(req: NextRequest) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized'  }, { status: 401 });
    }
    const data = await retreiveData("banner");
    return NextResponse.json({ status: 200, message:"Success", data: data }); 
}

// Handler untuk metode POST
export async function POST(req: NextRequest) {
    try {
        const apiKey = req.headers.get('apiKey');
        console.log(apiKey)
        const validApiKey = process.env.API_KEY

        if (!apiKey || apiKey !== validApiKey) {
            return NextResponse.json({ error: 'Unauthorized'  }, { status: 401 });
        }

        const body = await req.json();
        console.log(body);

        if (body) {
            return NextResponse.json({ status: 200 });
        } else {
            return NextResponse.json({ status: 404, data: 'Data not found' });
        }
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ status: 400, error: 'Invalid JSON' });
    }
}
