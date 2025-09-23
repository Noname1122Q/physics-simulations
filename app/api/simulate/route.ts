import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    console.log(`${process.env.BACKEND_URL}`);
    const body = await req.json();
    const backendRes = await axios.post(`${process.env.BACKEND_URL}`, body);
    return NextResponse.json(backendRes.data);
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json({ error: `${err}` }, { status: 500 });
  }
}
