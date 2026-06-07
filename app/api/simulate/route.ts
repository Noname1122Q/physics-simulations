import { NextResponse } from "next/server";
import axios from "axios";
import { env } from "@/lib/env";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const backendRes = await axios.post(`${env.backendUrl}`, body);
    console.log(backendRes.data);
    return NextResponse.json(backendRes.data);
  } catch (err) {
    return NextResponse.json({ error: `${err}` }, { status: 500 });
  }
}
