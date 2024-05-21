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

export async function createUser(userData: User): Promise<{ status: number, message: string }> {
    const userQuery = query(
        collection(firestore, "users"), where("email", "==", userData.email)
    );

    const snapshot = await getDocs(userQuery);
    userData.password = await bcrypt.hash(userData.password, 10);

    if (snapshot.empty) {
        try {
            await addDoc(collection(firestore, "users"), userData);
            console.log("Document successfully written!");
            return { status: 200, message: "User created" };
        } catch (error) {
            console.error("Error writing document: ", error);
            return { status: 400, message: "Error creating user" };
        }
    } else {
        console.log("User already exists");
        return { status: 400, message: "User already exists" };
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

