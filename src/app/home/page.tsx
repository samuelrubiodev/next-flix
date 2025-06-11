"use client";

import Link from "next/link"
import MovieCard from "../components/ui/Actions/MovieCard"
import { useEffect, useState } from "react"
import { MovieResult, TvResult } from "moviedb-promise";
import SearchMovie from "../components/ui/SearchMovie";
import Page from "../components/ui/Page";
import { useSearchParams } from 'next/navigation'
import Switch from "../components/ui/Switch";
import MovieAction from "@/actions/MovieAction";
import IRequestAction from "@/actions/IRequestAction";
import TvAction from "@/actions/TvAction";

const actions: IRequestAction<MovieResult[] | TvResult[]>[] = [
  new MovieAction(1, <></>),
  new TvAction(1, <></>)
];

export default function Home() {
  const [allMovies, setAllMovies] = useState<MovieResult[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  const filteredMovies = searchTerm.trim() === "" 
    ? allMovies
    : allMovies.filter(movie => 
      movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    const movies = new MovieAction(1, <></>);
    movies.sendRequest().then(setAllMovies);
  },[])

  return (
    <div>
      <SearchMovie 
        onSearchChange={(newSearchTerm: string) => {setSearchTerm(newSearchTerm);}}
      />
      <div className="flex flex-row items-center h-full w-full">
        <h1 className="text-3xl mt-5 mb-5 ml-2">Popular</h1>
        <Switch 
          className="flex justify-center ml-2 w-60 h-10"
          onChange={(selectedIndex) => {console.log(selectedIndex)}}
        >
          <p key={"movies"}>Movies</p>
          <p key={"tv_shows"}>TV Shows</p>
        </Switch>
      </div>

      <div className="flex flex-row justify-around overflow-x-scroll overflow-y-hidden h-full bg-white pl-5 pr-5 pb-5 pt-5 rounded-2xl border-2 mr-2 ml-2"
      >
        {filteredMovies.length > 0 ? filteredMovies.map((movie) => (
          <Link
            href={{
              pathname: `/movies/${movie.id}`
            }}
            className="mr-5 hover:transform-[scale(1.05)] transition-all duration-150 ease-in-out"
            key={movie.id}
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
        )) : <p className="text-white">No movies found.</p>}
      </div>
      <Page 
        onChange={() => {console.log("test")}}
        pages={[1,2,3,4]}
      />
    </div>
  )
}