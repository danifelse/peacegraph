import instance from "@/lib/axios/instance"

const getData = {
   banner: () => instance.get("/api/banner"),
   products: () => instance.get("/api/products"),
}

export async function getBannerData() {
   const banner = await getData.banner();
   console.log(banner.data.data);
   return banner.data.data;
 }

 export async function getProductsData() {
   const products = await getData.products();
   console.log(products.data.data);
   return products.data.data;
 }

export default getData