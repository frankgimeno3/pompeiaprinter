import { NextResponse, NextRequest } from "next/server";
import { jwtVerify, JWTVerifyResult } from "jose";

interface JWTPayload {
  [key: string]: string | undefined;
}

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("authvalue") as string | undefined;
  if (!jwt) {
    console.log("esto se activa si middleware NO encuentra cookie");
    return NextResponse.redirect(new URL("/", request.url));
  }  

  try {
    if(jwt) {
      console.log("esto se activa si middleware SÍ encuentra cookie");
      return NextResponse.next();
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
}

export const config = {
  matcher: ["/dashboard/:path*"],
};