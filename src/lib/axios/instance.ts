import axios from "axios";

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cahce-Control": "no-cache",
    "apiKey": process.env.NEXT_PUBLIC_KEY,
    Expires: 0,
    
}

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: headers,
    timeout: 60* 1000
});

instance.interceptors.response.use(
    (config) => config,
    (error) => Promise.reject(error)
)

instance.interceptors.request.use(
    (response) => response,
    (error) => Promise.reject(error),
)
export const fetcher = (url : string) => {
    console.log(url)
    return instance.get(url).then((res) => {
        console.log(res)
      if (!res.data) {
        throw Error(res.data.message);
      }

      return res.data;
    }).catch((err) => {
        console.log(err)
    })
  };

export default instance