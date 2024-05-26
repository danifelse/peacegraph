import { NextRequest, NextResponse } from 'next/server';
import { createProduct, retreiveData } from '@/lib/firebase/services';
import { Product } from '@/models/Product';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), '/src/data/products.json');


export async function GET(req: NextRequest, ) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const data  = await fsPromises.readFile(dataFilePath, 'utf8');
        const productsData : Product[] = JSON.parse(data);

        
        if (!productsData) {
            return NextResponse.json({ error: 'Images not found' }, { status: 404 });
        }

        return NextResponse.json({ status: 200, message: "Success", data: productsData });
    } catch (error) {
        console.error("Error fetching data ", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest  ) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;
    const newData = await req.json();
    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const data  = await fsPromises.readFile(dataFilePath, 'utf8');
        const productsData : Product[] = JSON.parse(data);
        const isExist = productsData.find((product: Product) => product.slug === newData.slug);
        if (isExist) {
            return NextResponse.json({ error: `Product name ${newData.name} already exist` }, { status: 409 });
        }

        
        productsData.push(newData);
        const updatedData = JSON.stringify(productsData);
        if (newData) {
            await fsPromises.writeFile(dataFilePath, updatedData);
            return NextResponse.json({ status: 200, message: `Success add ${newData.name} to products list`, data: newData });
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

