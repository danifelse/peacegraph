import {} from "firebase/app";
import app from "./init";
import { getFirestore, collection, getDocs, query, addDoc } from "firebase/firestore";
import { Product } from "@/models/Product";

const firestore = getFirestore(app);


export async function retreiveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data
}

export async function createProduct(product: Product ) {
    await addDoc(collection(firestore, "products"), product);
}