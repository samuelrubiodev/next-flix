"use server";

import { NextResponse, type NextRequest } from "next/server";
import moviedb from "../../../lib/tmdb";

export async function GET(request: NextRequest) {
  try {
    const tvShow = await moviedb.tvInfo({
        id: request.nextUrl.searchParams.get("id") || "",
        language: "en-US"
    })
    return NextResponse.json({ tvData: tvShow });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}