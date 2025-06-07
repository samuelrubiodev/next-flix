"use server";

import { NextResponse, type NextRequest } from "next/server";
import moviedb from "../../lib/tmdb";

export async function GET(request: NextRequest) {
  try {
    const movie = await moviedb.movieInfo({
      id: request.nextUrl.searchParams.get("id") || 0, 
      language: "en-US"}
    );
    return NextResponse.json({ movie });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}