"use client";

import { MovieResult } from "moviedb-promise";
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react";
import Movies from "@/app/components/ui/Actions/Movies/Movies";
import { OrbitProgress } from "react-loading-indicators";
import SearchMovie from "@/app/components/ui/SearchMovie";

function ResultsContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      const response = await fetch("/api/movies/search?" + new URLSearchParams({
        query: search || ""
      }).toString());
      const data = await response.json();
      setMovies(data.results as MovieResult[]);
      
    }
    fetchMovie();
    setIsLoading(false);

  },[search]);

  return (
    <div>
      <SearchMovie 
        onSearchChange={(searchTerm: string) => setSearchTerm(searchTerm)}
      />
      <h1 className="text-3xl mt-5 mb-5 ml-2">Search results for movies</h1>
      <div className="flex flex-row justify-around overflow-x-scroll overflow-y-hidden h-full 
        bg-white pl-5 pr-5 pb-5 pt-5 rounded-2xl border-2 mr-2 ml-2 mt-2"
      >
        {!isLoading
          ? <Movies 
              movies={movies}
              searchTerm={searchTerm}
            />
          : null}
       
      </div>
    </div>
  )
};

export default function ResultsPage() {
  return (
    <Suspense fallback={<OrbitProgress color="blue" size="large" easing="ease-in-out" />}>
      <ResultsContent />
    </Suspense>
  )
}