import axios,{ axiosPrivate, axiosPrivateUpload } from "@components/api/axios";
import { verifyJwtToken, getDataFromToken } from "@/utils/getDataFromToken";

import { NextResponse } from "next/server";

export async function POST(request){

    try {
        // const data = await verifyJwtToken(request);
        const data = await getDataFromToken(request);
        // console.log("My Info =========================, ", data)
        axiosPrivate.interceptors.request.use(
            async(config) => {
              if (!config.headers["Authorization"]) {
                config.headers["Authorization"] = `Bearer ${data.accessToken}`;
                
              } 
              return config;
            },
            (error) => Promise.reject(error)
          );
        
          const response1 =  await axiosPrivate.post(`/api/v1/user/getmyinfo/`, JSON.stringify({dateStarted: new Date().toLocaleString()}));

          if (response1.data.Status === 1) {
            //create token data

        const tokenData = { Message: response1.data.Message, myInfo: response1.data.Data, myMenus: response1.data.Menu }
        

        // console.log(tokenData, "Response from MyInfo=====================");

        const response = NextResponse.json(tokenData)

        return response;
          } else {
           
            return NextResponse.json({
                Message: response1.data.Message,
            }, {status: 404})
          }
        // return NextResponse.json(data)
    } catch (error) {
        if (!error?.response) {
     
            return NextResponse.json({ Message: "No Server Response."}, {status: 500})
          } else if (error?.response?.status === 400) {
           
            return NextResponse.json({ Message: error?.response?.data?.Message}, {status: error?.response?.status})
          } else if (error?.response?.status === 401) {
           
            return NextResponse.json({ Message: error?.response?.data?.Message}, {status: error?.response?.status})
          } else {
           
            return NextResponse.json({ Message: "Failed to get my info."}, {status: error?.response?.status})
          }
    }

}