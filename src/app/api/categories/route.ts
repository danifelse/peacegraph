import { retreiveData } from "@/lib/firebase/services";
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