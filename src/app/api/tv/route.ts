"use server";

import { NextResponse, type NextRequest } from "next/server";
import moviedb from "../../lib/tmdb";

export async function GET(request: NextRequest) {
  try {
    const { results } = await moviedb.tvPopular({
      language: "en-US",
      page: Number(request.nextUrl.searchParams.get("page") || 1),
    });
    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}