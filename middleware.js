import { NextResponse } from 'next/server'
import { verifyAuth } from './lib/auth'
import NextCrypto from 'next-crypto';
import { USER_TOKEN } from './lib/constants';


const crypto = new NextCrypto(process.env.ENCRYPTION_KEY);

export async function middleware(request) {
  const path = request.nextUrl.pathname

//   const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'
  const isPublicPath = path === '/signin' || path === '/signup' || path === '/flight-list' || path === '/checkout' || path === '/'

  const token = await request.cookies.get(USER_TOKEN)?.value || ''

  if(!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  try {


    const data = await verifyAuth(request);

    console.log("decoded token called==========================", data)

    if(!isPublicPath && data) {
      console.log("middleware isPublicPath && token called==========================")
      try {
          
        console.log("middleware called path==========================", path)
          return NextResponse.rewrite(new URL(path, request.url))
          // return NextResponse.json(data)
      } catch (error) {
          console.log("middleware isPublicPath && token error called==========================", error)
          return NextResponse.redirect(new URL('/signin', request.url))
      }
    }
  
  
    if (!isPublicPath && !data) {
      console.log("middleware !isPublicPath && !token==========================")
      return NextResponse.redirect(new URL('/signin', request.url))
    }

  } catch (error) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  
    
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/signin',
    '/signup',
    '/flight-list',
    '/personal-info',
    '/user-booking',
    '/user-payment',
    '/user-security',
    '/checkout',
    // '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}