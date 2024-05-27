import { getJSON, updateJSON } from "@/lib/firebase/servicejson";
import { deleteCategory, retreiveDataBySlug, updateCategory } from "@/lib/firebase/services";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const apiKey = req.headers.get('apiKey');
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const slug = params.slug;
    try {
        const data  = await getJSON("categoriesjson");
        const categoriesData : Category[] = JSON.parse(data.categoriesData);

        const category = categoriesData.find((category: Category) => category.slug === slug);

        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
        return NextResponse.json({ status: 200, message: "Success", data: category });
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
    const data  = await getJSON("categoriesjson");
    const categoriesData : Category[] = JSON.parse(data.categoriesData);
    const category = categoriesData.find((category: Category) => category.slug === slug);
    if (!category) {
        return NextResponse.json({ error: 'category not found' }, { status: 404 });
    }

    const productsData = await getJSON("productsjson");
    const products = JSON.parse(productsData.productsData);
    products.forEach((product: Product) => {
        if (product.category === category.slug) {
            product.category = newData.slug;
        }
    });
    productsData.productsData = JSON.stringify(products);
    await updateJSON("productsjson", "products", productsData);


    categoriesData[categoriesData.indexOf(category)] = newData;
    data.categoriesData = JSON.stringify(categoriesData);
    try {
        const status = await updateJSON("categoriesjson", "categories", data);
        if (status) {
            return NextResponse.json({ status: 200, message: `Category ${newData.name} updated successfully`, data: newData });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to update category' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
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
    const data  = await getJSON("categoriesjson");
    const categoriesData : Category[] = JSON.parse(data.categoriesData);
    const category = categoriesData.find((category: Category) => category.slug === slug);
    if (!category) {
        return NextResponse.json({ error: 'category not found' }, { status: 404 });
    }
    categoriesData.splice(categoriesData.indexOf(category), 1);
    data.categoriesData = JSON.stringify(categoriesData);
    try {
        const status = await updateJSON("categoriesjson", "categories", data);
        if (status) {
            return NextResponse.json({ status: 200, message: `Category ${category.name} deleted successfully` });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to delete categpry' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
    } catch (error) {
        console.error("Error deleting data in Firestore", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
//     const apiKey = req.headers.get('apiKey');
//     const validApiKey = process.env.API_KEY;
//     if (!apiKey || apiKey !== validApiKey) {
//         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }
//     const slug = params.slug;
//     const data = await retreiveDataBySlug("categories", slug);
//     if (!data) {
//         return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
//     }
//     return NextResponse.json({ status: 200, message:"Success", data: data });
// }

// export async function PUT ( req: NextRequest, { params }: { params: { slug: string } } ) {
//     const apiKey = req.headers.get('apiKey');
//     const validApiKey = process.env.API_KEY;
//     if (!apiKey || apiKey !== validApiKey) {
//         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }
//     const slug = params.slug;
//     const newData = await req.json();
//     const status = await updateCategory(slug, newData);
//     if (status) {
//         return NextResponse.json({ status: 200, message: 'Category updated successfully', data: newData });
//     } else {
//         return new Response(JSON.stringify({ error: 'Failed to update category' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
//     }
// }

// export async function DELETE ( req: NextRequest, { params }: { params: { slug: string } } ) {
//     const apiKey = req.headers.get('apiKey');
//     const validApiKey = process.env.API_KEY;
//     if (!apiKey || apiKey !== validApiKey) {
//         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }
//     const slug = params.slug;
//     const status = await deleteCategory(slug);
//     if (status) {
//         return NextResponse.json({ status: 200, message: 'Category deleted successfully' });
//     } else {
//         return new Response(JSON.stringify({ error: 'Failed to delete category' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
//     }
// }