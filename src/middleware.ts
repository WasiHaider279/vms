import { NextRequest, NextResponse } from "next/server";
import { DecryptString } from "./utils/string-encription";

const isMobile = (userAgent: string) =>
  /iPhone|iPad|iPod|Android|Tablet|Mobile/i.test(userAgent);

const urls: string[] = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset",
  "/check-your-mail",
  "/check-your-mail2",
  "/profile-rejection",
  "/signup-process",
  "/auth/verify",
  "/profile-pending",
];

export async function middleware(req: NextRequest) {
  const userAgent: any = req.headers.get("user-agent");
  const path = req.nextUrl.pathname;
  const token: boolean = req.cookies.has("token");
  const status: string | undefined = DecryptString({
    stringToDecrypt: req.cookies.get("status")?.value || "",
  });

  if (isMobile(userAgent)) {
    return NextResponse.rewrite(new URL("/download-app", req.url));
  }

  if (!token && !urls.includes(path)) {
    return NextResponse.redirect(new URL("/signin", req.url));
  } else if (
    token &&
    status === "Approved" &&
    (urls.includes(path) || path === "/settings")
  ) {
    return NextResponse.redirect(new URL(`/`, req.url));
  } else if (
    token &&
    status === "Rejected" &&
    (urls.includes(path) || !path.includes("settings"))
  ) {
    return NextResponse.redirect(new URL(`/settings`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
