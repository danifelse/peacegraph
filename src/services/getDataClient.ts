import axios from "axios";

export async function getData( url: string ): Promise<any> {
   try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`,{
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            apiKey: process.env.NEXT_PUBLIC_KEY?.toString(),
          },
    })

    return res;
   } catch (error) {
        console.log(error)
        return error
   }
}