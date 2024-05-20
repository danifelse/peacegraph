import type { NextApiRequest, NextApiResponse } from "next";
import { retreiveData } from "@/lib/firebase/services";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const data = await retreiveData("banner");
    if (data) {
        return Response.json({status: 200, data: data});
    }else{
        return Response.json({status: 404, data: "data not found"});
    }


}