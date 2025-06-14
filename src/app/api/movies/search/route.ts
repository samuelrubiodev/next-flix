"use server";

import { NextResponse, type NextRequest } from "next/server";
import moviedb from "../../../lib/tmdb";

export async function GET(request: NextRequest) {
  try {
    const { results } = await moviedb.searchMovie({
        query: request.nextUrl.searchParams.get("query") || "",
        language: "en-US",
        include_adult: true,
        page: 1,
    });
    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}