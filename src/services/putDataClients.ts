import axios from "axios";

export async function putData( url: string, data: any ): Promise<any> {
    try {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, data, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                apiKey: process.env.NEXT_PUBLIC_KEY?.toString(),
            },
        })
        return res
    } catch (error) {
        return error
    }
}