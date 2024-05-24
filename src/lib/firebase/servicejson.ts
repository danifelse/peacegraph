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