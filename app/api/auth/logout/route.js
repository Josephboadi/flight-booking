import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";
import axios from "@/components/api/axios";


export async function POST(request) {
    try {

        const token = request.cookies.get("jwt")?.value || '';
        // const { payload } = await jwtVerify(token, getJwtSecretKey());
        const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);

        await axios.post(
            "/api/v1/logout/",
            JSON.stringify({ refreshToken: decodedToken, dateStarted: new Date().toLocaleString() }),
           
          );

        const response = NextResponse.json(
            {
                Message: "Logout successful",
                Success: true,
            }
        )
        response.cookies.set("token1", "", 
        { httpOnly: true, expires: new Date(0) 
        });

        response.cookies.set("jwt", "", 
        { httpOnly: true, expires: new Date(0) 
        });
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
        
    }