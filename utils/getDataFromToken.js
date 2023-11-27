// import jwt from "jsonwebtoken";

import { jwtVerify } from "jose";

// export const getDataFromToken = (request) => {
//     try {
//         const token = request.cookies.get("token1")?.value || '';
//         const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
//         return decodedToken;
//     } catch (error) {
//         throw new Error(error.message);
//     }

// }

export function getJwtSecretKey() {
  const secret = process.env.TOKEN_SECRET;
  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(request) {
  console.log("getting token from util=======================, ", request.cookies.get("token1")?.value);
  try {
    const token = request.cookies.get("token1")?.value || '';
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    console.log("payload from util========================, ", payload)
    return payload;
  } catch (error) {
    console.log("error message from util======================, ", error);
    return null;
  }
}