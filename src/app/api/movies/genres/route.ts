/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { NextResponse, type NextRequest } from "next/server";
import moviedb from "../../../lib/tmdb";

export async function GET(request: NextRequest) {
  try {
    const { genres } = await moviedb.genreMovieList({
      language: "en-US"
    });

    return NextResponse.json({ genres: genres });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}