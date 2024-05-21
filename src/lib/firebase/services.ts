import {} from "firebase/app";
import app from "./init";
import { getFirestore, collection, getDocs, query, addDoc, where } from "firebase/firestore";
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

export async function createProduct(product: Product ) {
    await addDoc(collection(firestore, "products"), product);
}

export async function createUser(userData: User, callback: Function ) {
    const q = query(
        collection(firestore, "users"),where("email", "==", userData.email)
    )
    const snapshot = await getDocs(q);
    userData.password = await bcrypt.hash(userData.password, 10);
    if (snapshot.empty) {
        await addDoc(collection(firestore, "users"), userData).then(() => {
            console.log("Document successfully written!");
            callback(true);
        }).catch((error) => {
            console.error("Error writing document: ", error);
            callback(false);
        })
    } else {
        callback(false);
        console.log("User already exists");
    }
}