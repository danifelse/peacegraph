import axios from "axios";

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cahce-Control": "no-cache",
    Expires: 0,
}

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "apiKey": process.env.API_KEY,
    },
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

export default instance