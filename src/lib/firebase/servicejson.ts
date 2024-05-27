import {} from "firebase/app";
import app from "./init";
import { getFirestore, collection, getDocs, query, addDoc, where, doc, updateDoc, deleteDoc } from "firebase/firestore";

interface Data {
    id: string;
    [key: string]: any;
}

const firestore = getFirestore(app);

export async function getJSON(slug: string) {
    const q = query(collection(firestore, "datajson"), where("slug", "==", slug));
    const snapshot = await getDocs(q);
    const data : Data[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data[0];
}


export async function updateJSON(slug: string, newData: Data) {
    try {
        const q = query(collection(firestore, "datajson"), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        if (data.length > 0) {
            const docRef = doc(firestore, "datajson", data[0].id);
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