
import { nanoid } from 'nanoid'
import { SignJWT, jwtVerify } from 'jose'
import { NextResponse } from "next/server";
import { USER_TOKEN, getJwtSecretKey } from './constants'
import NextCrypto from 'next-crypto';


const crypto = new NextCrypto(process.env.ENCRYPTION_KEY);



// export class AuthError extends Error {

// }

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(req) {
  const token = req.cookies.get(USER_TOKEN)?.value


  try {
    const decrypted = await crypto.decrypt(token);
    const verified = await jwtVerify(
        decrypted,
      new TextEncoder().encode(getJwtSecretKey())
    )

    // console.log("Verified token========================== ", verified)
    return verified.payload
  } catch (err) {
    console.log("Error verifying token========================== ", err)
    return ""
  }
}

/**
 * Adds the user token cookie to a response.
 */
export async function setUserCookie(res) {
// console.log("request received from server ===================, ", request)
// console.log("getJwtSecretKey from server ===================, ", getJwtSecretKey())
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    // .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(new TextEncoder().encode(getJwtSecretKey()))

console.log("Token created in api=================, ", token)
console.log("user token name==========================, ", USER_TOKEN)
const tokenData = {
    Message: "server response",
    isAuthenticated: true,
}
const response = NextResponse.json(tokenData)
await response.cookies.set(USER_TOKEN, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 2, // 2 hours in seconds
  })

//   console.log("Cookies set==========================, ")

  return response

}

/**
 * Expires the user token cookie
 */
export function expireUserCookie(res) {
  res.cookies.set(USER_TOKEN, '', { httpOnly: true, maxAge: 0 })
  return res
}