import { getJSON, updateJSON } from "@/lib/firebase/servicejson";
import { deleteProduct, retreiveDataBySlug, updateProduct } from "@/lib/firebase/services";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const slug = params.slug;
    try {
        const data  = await getJSON("products");
        const productsData : Product[] = JSON.parse(data.productsData);

        const product = productsData.find((product: Product) => product.slug === slug);

        if (!product) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }
        return NextResponse.json({ status: 200, message: "Success", data: product });
    } catch (error) {
        console.error("Error fetching data from Firestore", error);
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
    const data  = await getJSON("products");
    const productsData : Product[] = JSON.parse(data.productsData);
    const product = productsData.find((product: Product) => product.slug === slug);
    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }


    productsData[productsData.indexOf(product)] = newData;
    data.productsData = JSON.stringify(productsData);
    try {
        const status = await updateJSON("products", data);
        if (status) {
            return NextResponse.json({ status: 200, message: 'Product updated successfully', data: newData });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to update image' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
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
    const data  = await getJSON("products");
    const productsData : Product[] = JSON.parse(data.productsData);
    const product = productsData.find((product: Product) => product.slug === slug);
    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    productsData.splice(productsData.indexOf(product), 1);
    data.productsData = JSON.stringify(productsData);
    try {
        const status = await updateJSON( "products", data);
        if (status) {
            return NextResponse.json({ status: 200, message: 'Product deleted successfully' });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to delete image' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
    } catch (error) {
        console.error("Error deleting data in Firestore", error);
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
