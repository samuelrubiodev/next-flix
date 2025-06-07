"use client";

import Link from "next/link"
import MovieCard from "../components/ui/MovieCard"
import { useEffect, useState } from "react"
import { MovieResult } from "moviedb-promise";

export default function Home() {  
  const [movies, setMovies] = useState<MovieResult[]>();

  useEffect(() => {
    const movies = async () => {
      const response = await fetch("/api/movies?" + new URLSearchParams({
        page: "1"
      }).toString());
      const data = await response.json();
      setMovies(data.results as MovieResult[]);
    };
    movies();

  },[])

  return (
    <div>
      <div className="flex flex-row justify-around overflow-x-scroll pb-4 mr-1 bg-emerald-400 h-auto">
        {movies ? movies.map((movie) => (
          <Link
            href={"/home"}
            className="mr-5 hover:blur-xs hover:opacity-70"
            key={movie.id}
            scroll
          >
            <MovieCard
              title={movie.title || ""}
              posterImage={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ""}
              genres={[]}
              overiew={movie.overview || ""}
              relaseDate={movie.release_date ? new Date(movie.release_date) : new Date()}
              voteAverage={movie.vote_average || 0}
            />
          </Link>
        )) : null}
      </div>
    </div>
  )
}