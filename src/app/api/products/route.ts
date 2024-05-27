import { NextRequest, NextResponse } from 'next/server';
import { createProduct, retreiveData } from '@/lib/firebase/services';
import { Product } from '@/models/Product';
import { getJSON, updateJSON } from '@/lib/firebase/servicejson';

export async function GET(req: NextRequest, ) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const data  = await getJSON("products");
        const productsData : Product[] = JSON.parse(data.productsData);

        if (!productsData) {
            return NextResponse.json({ error: 'Images not found' }, { status: 404 });
        }

        return NextResponse.json({ status: 200, message: "Success", data: productsData });
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
        const data  = await getJSON("products");
        const productsData : Product[] = JSON.parse(data.productsData);
        const newData = await req.json();

        const isExist = productsData.find(product => product.slug === newData.slug);
        if (isExist) {
            return NextResponse.json({ error: `Ups, ${newData.name} already exist` }, { status: 409 });
        }

        productsData.push(newData);
        data.productsData = JSON.stringify(productsData);
        if (newData) {
            await updateJSON("products" , data );
            return NextResponse.json({ status: 200, message: `${newData.name} created successfully`, data: newData });
        }

        return NextResponse.json({ error: 'Data not found' }, { status: 404 });

    } catch (error) {
        console.error("Error fetching data from Firestore", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
//  USING FIREBASE

// // Handler untuk metode GET
// export async function GET(req: NextRequest) {
//     const apiKey = req.headers.get('apiKey');
//     const validApiKey = process.env.API_KEY

//     if (!apiKey || apiKey !== validApiKey) {
//         return NextResponse.json({ error: 'Unauthorized'  }, { status: 401 });
//     }
//     const data = await retreiveData("products");
//     return NextResponse.json({ status: 200, message:"Success", data: data }); 
// }

// // Handler untuk metode POST
// export async function POST(req: Request) {
//     try {
//         const apiKey = req.headers.get('apiKey');
//         const validApiKey = process.env.API_KEY;

//         if (!apiKey || apiKey !== validApiKey) {
//             return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//         }

//         const data: Product = await req.json();
        
//         if (data) {
//             const status = await createProduct(data);
//             if (status) {
//                 return NextResponse.json({ status: 200, message: 'Product created successfully' });
//             } else {
//                 return new Response(JSON.stringify({ error: 'Product already exists' }), { status: 400, headers: { 'Content-Type': 'application/json' }});
//             }
//         }   
//     } catch (error) {
//         console.error('Error parsing JSON:', error);
//         return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
//     }
// }

