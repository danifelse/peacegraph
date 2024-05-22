import {} from "firebase/app";
import app from "./init";
import { getFirestore, collection, getDocs, query, addDoc, where, doc, updateDoc } from "firebase/firestore";
import { Product } from "@/models/Product";
import bcrypt from "bcrypt";
import { User } from "@/models/User";

const firestore = getFirestore(app);


export async function retreiveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data
}

export async function retreiveDataBySlug(collectionName: string, slug: string) {
    const q = query(collection(firestore, collectionName), where("slug", "==", slug));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data[0];
}

export async function createProduct(product: Product): Promise<boolean> {
    try {
        const q = query(collection(firestore, "products"), where("name", "==", product.name));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        if (data.length === 0) {
            await addDoc(collection(firestore, "products"), product);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error creating product:', error);
        return false;
    }
}

export async function updateProduct(slug: string,product: Product): Promise<boolean> {
    try {
        const q = query(collection(firestore, "products"), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        if (data.length > 0) {
            const docRef = doc(firestore, "products", data[0].id);
            await updateDoc(docRef, product);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error updating product:', error);
        return false;
    }
}

export async function createUser(userData: User): Promise<boolean > {
    const userQuery = query(
        collection(firestore, "users"), where("email", "==", userData.email)
    );
    const snapshot = await getDocs(userQuery);
    userData.password = await bcrypt.hash(userData.password, 10);
    if (snapshot.empty) {
        try {
            await addDoc(collection(firestore, "users"), userData);
            return true;
        } catch (error) {
            return false;
        }
    } else {
        console.log("User already exists");
        return false;
    }
}



export async function login(email: string) {
    const userQuery = query(
        collection(firestore, "users"), where("email", "==", email)
    );
    const snapshot = await getDocs(userQuery);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))

    if (data) {
        return data[0];
    }else{
        return null;
    }

}

