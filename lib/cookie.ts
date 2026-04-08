"use server";
import { cookies } from "next/headers";

/**
 * Checks if a domain is a public suffix
 * @param domain - The domain to check
 * @returns true if the domain is a public suffix
 */
function isPublicSuffix(domain: string): boolean {
  const publicSuffixes = [
    '.ondigitalocean.app',
    '.herokuapp.com',
    '.vercel.app',
    '.netlify.app',
    '.github.io',
    '.firebaseapp.com',
    '.appspot.com',
    '.cloudflare.com',
    '.railway.app',
    '.render.com',
    '.fly.dev',
    '.up.railway.app'
  ];
  
  return publicSuffixes.some(suffix => domain.endsWith(suffix));
}

/**
 * Sets a cookie from a string representation.
 *
 * @param cookie - The cookie string to be parsed and set.
 *
 * The cookie string should be in the format:
 * "name=value; Domain=domain; Path=path; Expires=date; Secure; HttpOnly; SameSite=strict; Max-Age=seconds"
 *
 * Example:
 * setCookieFromString("sessionId=abc123; Domain=example.com; Path=/; Expires=Wed, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly; SameSite=Strict; Max-Age=3600");
 */
export async function setCookieFromString(cookie: string): Promise<void> {
  // Parse the cookie string to extract individual parameters
  const cookieParams = cookie
    .split(";")
    .map((param: any) => param.trim().split("="));
  const cookieName = cookieParams[0][0];
  const cookieValue = cookieParams[0][1];
  const domain = cookieParams.find(
    (param: any) => param[0].toLowerCase() === "domain"
  )?.[1];
  const path = cookieParams.find(
    (param: any) => param[0].toLowerCase() === "path"
  )?.[1];
  const expires = cookieParams.find(
    (param: any) => param[0].toLowerCase() === "expires"
  )?.[1];
  const secure = cookieParams.find(
    (param: any) => param[0].toLowerCase() === "secure"
  )?.[1];
  const httpOnly = cookieParams.find(
    (param: any) => param[0].toLowerCase() === "httponly"
  )?.[1];
  const sameSite = cookieParams.find(
    (param: any) => param[0].toLowerCase() === "samesite"
  )?.[1];

  const maxAge = cookieParams.find(
    (param: any) => param[0].toLowerCase() === "max-age"
  )?.[1];

  // Set your cookie with all the parameters
  // Don't set domain for public suffix domains to avoid browser rejection
  const cookieOptions: any = {
    path,
    expires: expires
      ? new Date(expires)
      : new Date(Date.now() + maxAge ? parseInt(maxAge) : 0),
    secure: secure ? secure === "true" : undefined,
    httpOnly: httpOnly ? httpOnly === "true" : undefined,
    sameSite: sameSite as any,
    maxAge: maxAge ? parseInt(maxAge) : undefined,
  };

  // Only set domain if it's not a public suffix
  if (domain && !isPublicSuffix(domain)) {
    cookieOptions.domain = domain;
  }

  (await cookies()).set(cookieName, cookieValue, cookieOptions);
}
