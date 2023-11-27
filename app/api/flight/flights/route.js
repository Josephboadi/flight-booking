import axios from "axios";
import { verifyAuth } from "@/lib/auth";

import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    const reqBody = await request.json();
    const data = await verifyAuth(request);
    
    console.log("Session ID==================================, ",data.session)
    console.log("Request body Flights==================================, ",reqBody)

    if(data) {
    const response1 = await axios.post(
      "http://10.10.30.72/FlightBookingAPI/api/flight/search", reqBody, { headers: {"SESS_ID": data.session } }
    );

    console.log("Flight Response==========================================,  ", response1)

    if (response1.data.status === 1) {
      const response = NextResponse.json(
        {
          Message: response1.data.message,
          Data: response1.data.data,
          isAuthenticated: true,
          Status: 1
        },
        { status: 200 }
      );

      return response
    } else {
      return NextResponse.json(
        { isAuthenticated: false, Message: response1.data.message, Status: 0 },
        { status: 404 }
      );
    }
  }else{
    // console.log("Verify Auth Error================================, ")
    return NextResponse.json({
      Message: "Session expired",
      isAuthenticated: false,
      Status: 0
  }, {status: 401})
  }
  } catch (error) {
    console.log(error.response.data ?? error.message);
    if (!error?.response) {
      return NextResponse.json(
        { isAuthenticated: false, Message: "No Server Response.", Status: 0 },
        { status: 500 }
      );
    } else if (error?.response?.status === 400) {
      return NextResponse.json(
        { isAuthenticated: false, Message: error?.message.title, Status: 0 },
        { status: error?.response?.status }
      );
    } else if (error?.response?.status === 404) {
      return NextResponse.json(
        { isAuthenticated: false, Message: error?.message.title, Status: 0 },
        { status: error?.response?.status }
      );
    } else {
      return NextResponse.json(
        { isAuthenticated: false, Message: "Failed to create login.", Status: 0 },
        { status: error?.response?.status }
      );
    }
  }
}
