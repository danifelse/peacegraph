import { deleteProduct, retreiveDataBySlug, updateProduct } from "@/lib/firebase/services";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server"
import path from "path";
import fsPromises from 'fs/promises';

const dataFilePath = path.join(process.cwd(), '/src/data/products.json');
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const slug = params.slug;
    try {
        const data  = await fsPromises.readFile(dataFilePath, 'utf8');
        const productsData : Product[] = JSON.parse(data);
        const product = productsData.find((product: Product) => product.slug === slug);

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ status: 200, message: "Success", data: product });
    } catch (error) {
        console.error("Error fetching data", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT (req: NextRequest, { params }: { params: { slug: string } }) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const slug = params.slug;
    const newData = await req.json();
    try {
        const data  = await fsPromises.readFile(dataFilePath, 'utf8');
        const productsData : Product[] = JSON.parse(data);
        const isExist = productsData.find((product: Product) => product.slug === newData.slug);
        if (isExist) {
            return NextResponse.json({ error: `Product name ${newData.name} already exist` }, { status: 409 });
        }

        const product = productsData.find((product: Product) => product.slug === slug);
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        productsData[productsData.indexOf(product)] = newData;
        const updatedData = JSON.stringify(productsData);

        if (newData) {
            await fsPromises.writeFile(dataFilePath, updatedData);
            return NextResponse.json({ status: 200, message: `Success edit ${newData.name} product`, data: newData });
        }
        
    } catch (error) {
        console.error("Error updating data in Firestore", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE (req: NextRequest, { params }: { params: { slug: string } }) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const slug = params.slug;
    try {
        const data  = await fsPromises.readFile(dataFilePath, 'utf8');
        const productsData : Product[] = JSON.parse(data);
        const product = productsData.find((product: Product) => product.slug === slug);
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        productsData.splice(productsData.indexOf(product), 1);
        const updatedData = JSON.stringify(productsData);

        await fsPromises.writeFile(dataFilePath, updatedData);
       
        return NextResponse.json({ status: 200, message: `${product.name} deleted successfully` });
       
    } catch (error) {
        console.error("Error deleting data", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


// export async function GET( req: NextRequest, { params }: { params: { slug: string } } ) {
//     const apiKey = req.headers.get('apiKey');
//     const validApiKey = process.env.API_KEY

//     if (!apiKey || apiKey !== validApiKey) {
//         return NextResponse.json({ error: 'Unauthorized'  }, { status: 401 });
//     }
//     const slug = params.slug

//     const data = await retreiveDataBySlug("products", slug);

//     if (!data) {
//         return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404, headers: { 'Content-Type': 'application/json' }});
//     }

//     return NextResponse.json({ status: 200, message:"Success", data: data });

//   }


// export async function PUT( req: NextRequest, { params }: { params: { slug: string } } ) {
//     const apiKey = req.headers.get('apiKey');
//     const validApiKey = process.env.API_KEY

//     if (!apiKey || apiKey !== validApiKey) {
//         return NextResponse.json({ error: 'Unauthorized'  }, { status: 401 });
//     }
//     const slug = params.slug
//     const newData = await req.json();

//     const status = await updateProduct(slug, newData);
//     if (status) {
//         return NextResponse.json({ status: 200, message: 'Product updated successfully', data: newData });
//     } else {
//         return new Response(JSON.stringify({ error: 'Failed to update product' }), { status: 404, headers: { 'Content-Type': 'application/json' }});
//     }
// }

// export async function DELETE( req: NextRequest, { params }: { params: { slug: string } } ) {
//     const apiKey = req.headers.get('apiKey');
//     const validApiKey = process.env.API_KEY 

//     if (!apiKey || apiKey !== validApiKey) {
//         return NextResponse.json({ error: 'Unauthorized'  }, { status: 401 });
//     }

//     const slug = params.slug
//     const status = await deleteProduct(slug);

//     if (status) {
//         return NextResponse.json({ status: 200, message: 'Product deleted successfully' });
//     } else {
//         return new Response(JSON.stringify({ error: 'Failed to delete product' }), { status: 404, headers: { 'Content-Type': 'application/json' }});
//     }
// }
