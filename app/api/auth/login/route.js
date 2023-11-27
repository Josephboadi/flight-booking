import axios from "axios";
// import { getJwtSecretKey } from "@/utils/getDataFromToken";
// import { SignJWT } from "jose";
// import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { USER_TOKEN, getJwtSecretKey } from "@/lib/constants";
import FormData from "form-data";
import NextCrypto from "next-crypto";

const crypto = new NextCrypto(process.env.ENCRYPTION_KEY);

export async function POST(request) {
  try {
    const reqBody = await request.json();

    // console.log("Request body==================================, ",reqBody)

    const response1 = await axios.post(
      "http://10.10.30.72/FlightBookingAPI/api/auth/login",
     reqBody
    );

    // console.log("Login Response==========================================,  ", response1.data)

    if (response1.data.status === 1) {
      const token = await new SignJWT({ session: response1.data.data })
        .setProtectedHeader({ alg: "HS256" })
        // .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("45m")
        .sign(new TextEncoder().encode(getJwtSecretKey()));

        // console.log("token====================================, ", token)

      const encrypted = await crypto.encrypt(token);

      // console.log("encrypted====================================, ", encrypted)
     
      const response = NextResponse.json(
        {
          Message: response1.data.message,
          Data: response1.data.data,
          isAuthenticated: true,
          Status: 1
        },
        { status: 200 }
      );
      await response.cookies.set(USER_TOKEN, encrypted, {
        httpOnly: true,
        maxAge: 60 * 60 * 2, // 2 hours in seconds
      });

      return response
    } else {
      return NextResponse.json(
        { isAuthenticated: false, Message: response1.data.message, Status: 0 },
        { status: 401 }
      );
    }

      // const token = await new SignJWT({ session: reqBody.email })
      //   .setProtectedHeader({ alg: "HS256" })
      //   // .setJti(nanoid())
      //   .setIssuedAt()
      //   .setExpirationTime("10m")
      //   .sign(new TextEncoder().encode(getJwtSecretKey()));

      //   console.log("token====================================, ", token)

      // const encrypted = await crypto.encrypt(token);

      // console.log("encrypted====================================, ", encrypted)
     
      // const response = NextResponse.json(
      //   {
      //     Message: "Login Successful",
      //     Data: reqBody.email,
      //     isAuthenticated: true,
      //     Status: 1
      //   },
      //   { status: 200 }
      // );
      // await response.cookies.set(USER_TOKEN, encrypted, {
      //   httpOnly: true,
      //   maxAge: 60 * 60 * 2, // 2 hours in seconds
      // });

      // return response
    
  } catch (error) {
    console.log(error);
    if (!error?.response) {
      return NextResponse.json(
        { isAuthenticated: false, Message: "No Server Response.", Status: 0 },
        { status: 500 }
      );
    } else if (error?.response?.status === 400) {
      return NextResponse.json(
        { isAuthenticated: false, Message: error?.response?.data?.Message, Status: 0 },
        { status: error?.response?.status }
      );
    } else if (error?.response?.status === 401) {
      return NextResponse.json(
        { isAuthenticated: false, Message: error?.response?.data?.Message, Status: 0 },
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
