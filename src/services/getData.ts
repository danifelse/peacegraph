import instance from "@/lib/axios/instance"

const getData = {
   banner: () => instance.get("/api/banner"),
}

export default getData