import {} from "firebase/app";
import app from "./init";
import { getFirestore, collection, getDocs, query, addDoc, where, doc, updateDoc, deleteDoc } from "firebase/firestore";

interface Data {
    id: string;
    [key: string]: any;
}

const firestore = getFirestore(app);

export async function getJSON(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data : Data[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data[0];
}

export async function getCollectionData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data : Data[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
}

export async function createCollectionData(collectionName: string, newData: Data) : Promise<boolean> {
    try {
        const q = query(collection(firestore, collectionName), where("slug", "==", newData.slug));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        if (data.length === 0) {
            await addDoc(collection(firestore, collectionName), newData);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error creating new data:', error);
        return false;
    }
}

export async function updateJSON(collectionName: string,slug: string, newData: Data) {
    try {
        const q = query(collection(firestore, collectionName), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        if (data.length > 0) {
            const docRef = doc(firestore, collectionName, data[0].id);
            await updateDoc(docRef, newData);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error updating product:', error);
        return false;
    }
}