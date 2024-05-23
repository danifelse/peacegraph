import axios from "axios"

export async function deleteData( url: string ): Promise<any> {
    console.log(`axios url : ${url}`)
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
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