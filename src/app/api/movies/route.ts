"use server";

import { NextResponse, type NextRequest } from "next/server";
import moviedb from "../../lib/tmdb";

export async function GET(request: NextRequest) {
  try {
    const { results } = await moviedb.moviePopular({
      page: Number(request.nextUrl.searchParams.get("page")) || 1,
      language: "es-ES"
    });
    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}