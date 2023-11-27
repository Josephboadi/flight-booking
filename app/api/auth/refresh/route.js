import { verifyAuth } from "@/lib/auth";
import { USER_TOKEN } from "@/lib/constants";

import { NextResponse } from "next/server";

export async function POST(request){
    try{

      const token = await request.cookies.get(USER_TOKEN)?.value || ''

      console.log("Refresh token================================, ",token)

  if(!token) {
    console.log("Verify Auth Error================================, ")
    return NextResponse.json({
      Message: "Session not created",
      isAuthenticated: false,
      Status: 0
  }, {status: 401})
  }

  const data = await verifyAuth(request);

  console.log("Verify Auth================================, ",data)

  if(data) {
    
      return NextResponse.json({
        Message: "Session is active.",
        Data: data.session,
        isAuthenticated: true,
        Status: 1
    }, {status: 200})
   
  }else{
    // console.log("Verify Auth Error================================, ")
    return NextResponse.json({
      Message: "Session expired",
      isAuthenticated: false,
      Status: 0
  }, {status: 401})
  }

    }catch (error) {
      console.log("Refesh Error==================================, ", error)
    if (!error?.response) {
     
      return NextResponse.json({isAuthenticated: false, Message: "No Server Response.", Status: 0}, {status: 500})
    } else if (error?.response?.status === 400) {
     
      return NextResponse.json({isAuthenticated: false, Message: error?.response?.data?.Message, Status: 0}, {status: error?.response?.status})
    } else if (error?.response?.status === 401) {
     
      return NextResponse.json({isAuthenticated: false, Message: error?.response?.data?.Message, Status: 0}, {status: error?.response?.status})
    } else {
     
      return NextResponse.json({isAuthenticated: false, Message: "Failed to create login.", Status: 0}, {status: error?.response?.status})
    }
    }
} 