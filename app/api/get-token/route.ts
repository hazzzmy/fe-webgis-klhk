// app/api/some-endpoint/route.ts (Next.js 13 App Router)
import { getToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  // Get the token from Clerk
  const token = await getToken(req);

  // If no token is returned, respond with an unauthorized status
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // If the token is valid, respond with the token or handle further processing
  return NextResponse.json({ message: "Authenticated", token });
}
