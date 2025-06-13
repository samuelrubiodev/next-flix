import { TvResult } from "moviedb-promise";
import Link from "next/link";
import TvShowCard from "./TvShowCard";

type TvShowsProps = {
  tvShows: TvResult[]
  searchTerm: string,
};

export default function TvShows(props: TvShowsProps) {
  const filteredMovies = props.searchTerm.trim() === "" 
    ? props.tvShows
    : props.tvShows.filter(tvShow => 
      tvShow.name?.toLowerCase().includes(props.searchTerm.toLowerCase())
  );  

  return (
    <>
      {filteredMovies.length > 0 ? filteredMovies.map((tvShow) => (
        <Link
          href={{
            pathname: `/tvShows/${tvShow.id}`
          }}
          className="mr-5 hover:transform-[scale(1.05)] transition-all duration-150 ease-in-out"
          key={tvShow.id}
        >
        <TvShowCard
          name={tvShow.name || ""}
          posterImage={tvShow.poster_path ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` : ""}
          genre_ids={[]}
          overview={tvShow.overview || ""}
          first_air_date={tvShow.first_air_date ? new Date(tvShow.first_air_date) : new Date()}
          vote_average={tvShow.vote_average || 0}
        />
      </Link>
      )) : <p className="text-black">No series found.</p>}
    </>
  )
}