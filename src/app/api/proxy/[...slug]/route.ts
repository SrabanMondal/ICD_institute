// app/api/proxy/[...slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { parse } from "cookie";
const apiurl = process.env.API_URL
async function handleRequest(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") || "";
  //console.log(cookieHeader)
  //console.log(req.headers)
  const cookies = parse(cookieHeader);
  const token = cookies.authtoken;
  //console.log(token)
  if (!token) {
    return NextResponse.json({ status:false,message: "Not authenticated" }, { status: 401 });
  }

  const { pathname, search } = new URL(req.url);
  const externalPath = pathname.replace(/^\/api\/proxy/, "");
  const externalApiUrl = `${apiurl}${externalPath}${search}`;
  //console.log(externalApiUrl)
  try {
    const response = await axios({
      url: externalApiUrl,
      method: req.method,
      headers: {
        Authorization: `${token}`,
      },
      data: req.method !== "GET" ? await req.json().catch(() => undefined) : undefined,
    });
    console.log(response.data)
    return NextResponse.json(response.data); // Send only response.data
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status:false,message: error },
      { status:  500 }
    );
  }
}

// ✅ Export each HTTP method separately
export async function GET(req: NextRequest) {
  return handleRequest(req);
}

export async function POST(req: NextRequest) {
  return handleRequest(req);
}

export async function PUT(req: NextRequest) {
  return handleRequest(req);
}

export async function DELETE(req: NextRequest) {
  return handleRequest(req);
}
