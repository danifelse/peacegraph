import { createCategory, retreiveData } from "@/lib/firebase/services";
import { Category } from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";
import fsPromises from 'fs/promises';
import path from 'path';


const dataFilePath = path.join(process.cwd(), '/src/data/categories.json');


export async function GET(req: NextRequest, ) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const data  = await fsPromises.readFile(dataFilePath, 'utf8');
        const categoriesData : Category[] = JSON.parse(data);
        
        if (!categoriesData) {
            return NextResponse.json({ error: 'Images not found' }, { status: 404 });
        }

        return NextResponse.json({ status: 200, message: "Success", data: categoriesData });
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
        const data  = await fsPromises.readFile(dataFilePath, 'utf8');
        const categoriesData : Category[] = JSON.parse(data);
        const newData = await req.json();

        const isExist = categoriesData.find((category: Category) => category.slug === newData.slug);
        if (isExist) {
            return NextResponse.json({ error: 'category already exists' }, { status: 409 });
        }
        
        categoriesData.push(newData);
        const updatedData = JSON.stringify(categoriesData);
        if (newData) {
            await fsPromises.writeFile(dataFilePath, updatedData);
            return NextResponse.json({ status: 200, message: `Success Create ${newData.name} category` , data: newData });
        }

        return NextResponse.json({ error: 'Data not found' }, { status: 404 });

    } catch (error) {
        console.error("Error fetching data from Firestore", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


//USING FIRESTORE

// export async function GET(req: NextRequest){
//     const apiKey = req.headers.get('apiKey');
//     const validApiKey = process.env.API_KEY

//     if (!apiKey || apiKey !== validApiKey) {
//         return NextResponse.json({ error: 'Unauthorized'  }, { status: 401 });
//     }
//     const data = await retreiveData("categories");
//     return NextResponse.json({ status: 200, message:"Success", data: data }); 
// }


//POST CATEGORY OLD NORMAL LOGIC
// export async function POST(req: NextRequest){
//     try {
//     const apiKey = req.headers.get('apiKey');
//     const validApiKey = process.env.API_KEY

//     if (!apiKey || apiKey !== validApiKey) {
//         return NextResponse.json({ error: 'Unauthorized'  }, { status: 401 });
//     }

//     const data = await req.json();
//     if (data) {
//         const status = await createCategory(data);
//         if (status) {
//             return NextResponse.json({ status: 200, message: 'Category created successfully' });
//         } else {
//             return new Response(JSON.stringify({ error: 'Category already exists' }), { status: 400, headers: { 'Content-Type': 'application/json' }});
//         }

//     } else { 
//         return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' }});
//     }
//     } catch (error) {
//         return new Response(JSON.stringify({ error: error }), { status: 400, headers: { 'Content-Type': 'application/json' }});
//     }
// }
