import {} from "firebase/app";
import app from "./init";
import { getFirestore, collection, getDocs, query, addDoc, where, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Product } from "@/models/Product";
import bcrypt from "bcrypt";
import { User } from "@/models/User";
import { Category } from "@/models/Category";

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
        const q = query(collection(firestore, "products"), where("slug", "==", product.slug));
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

export async function deleteProduct(slug: string): Promise<boolean> {
    console.log(`firebase slug : ${slug}`)
    try {
        const q = query(collection(firestore, "products"), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        if (data.length > 0) {
            const docRef = doc(firestore, "products", data[0].id);
            await deleteDoc(docRef);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        return false;
    }
}

export async function createCategory(category: Category): Promise<boolean> {
    const q = query(collection(firestore, "categories"),(where("slug", "==", category.slug)));
    const snapshot = await getDocs(q);
    const data  = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))

    if (data.length === 0) {
        try {
            await addDoc(collection(firestore, "categories"), category);
            return true;
        } catch (error) {
            return false;
        }
    } else {
        console.log("Category already exists");
        return false;
        
    }
}

export async function updateCategory(slug: string,category: Category): Promise<boolean> {
    try {
        const q = query(collection(firestore, "categories"), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        if (data.length > 0) {
            const docRef = doc(firestore, "categories", data[0].id);
            await updateDoc(docRef, category);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error updating category:', error);
        return false;
    }
}

export async function deleteCategory(slug: string): Promise<boolean> {
    try {
        const q = query(collection(firestore, "categories"), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        if (data.length > 0) {
            const docRef = doc(firestore, "categories", data[0].id);
            await deleteDoc(docRef);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        return false;
    }
}

export async function createUser(userData: User): Promise<{status: boolean , message: string}> {
    const queryUsers = query(collection(firestore, "users"));
    const snapshotUsers = await getDocs(queryUsers);
    const usersData = snapshotUsers.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))
    if (usersData.length >= 5) {
        return { status: false, message: "Maximum user reached" };
    } 
    const userQuery = query(
        collection(firestore, "users"), where("email", "==", userData.email)
    );
    const snapshot = await getDocs(userQuery);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))
    userData.password = await bcrypt.hash(userData.password, 10);
    if (data.length === 0) {
        try {
            await addDoc(collection(firestore, "users"), userData);
            return { status: true, message: "User created successfully" };
        } catch (error) {
            return { status: false, message: "Failed to create user" };
        }
    } else {
        console.log("User already exists");
        return { status: false, message: "Email aready registered" };
    }
}


export async function deleteUser(id: string): Promise<boolean> {
    const q = query(collection(firestore, "users"), where("id", "==", id));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
        const docRef = doc(firestore, "users", snapshot.docs[0].id);
        await deleteDoc(docRef);
        return true;
    } else {
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

