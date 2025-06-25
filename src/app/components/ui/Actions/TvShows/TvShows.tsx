import Link from "next/link";
import TvShowCard from "./TvShowCard";
import { GenericActionsProps } from "@/types/actions/types";

export default function TvShows(props: GenericActionsProps) {
  const filteredMovies = (props.tvShows ?? [])
    .filter(tvShow => {
      if (props.selectedGenre !== "1" && props.selectedGenre !== "") {
        const genreId = parseInt(props.selectedGenre || "", 10);
        if (!tvShow.genre_ids?.includes(genreId)) {
          return false;
        }
      }

      /*
      if (props.calification !== "Select calification" && props.calification !== "") {
        const minRating = parseFloat(props.calification || "");
        if ((tvShow.vote_average || 0) < minRating) {
          return false;
        }
      }
      */

      const searchTerm = props.searchTerm ?? "";
      if (searchTerm.trim() !== "" && !tvShow.name?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    });  
  
    /*
        .sort((a, b) => {
      switch (props.sort) {
        case "rating_desc":
          return (b.vote_average || 0) - (a.vote_average || 0);
        case "rating_asc":
          return (a.vote_average || 0) - (b.vote_average || 0);
        case "date_desc": {
          const dateA = a.first_air_date ? new Date(a.first_air_date).getTime() : 0;
          const dateB = b.first_air_date ? new Date(b.first_air_date).getTime() : 0;
          return dateB - dateA;
        }
        case "date_asc": {
          const dateA = a.first_air_date ? new Date(a.first_air_date).getTime() : 0;
          const dateB = b.first_air_date ? new Date(b.first_air_date).getTime() : 0;
          return dateA - dateB;
        }
        default:
          return 0;
      }
    })

    */
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {filteredMovies.length > 0 ? filteredMovies.map((tvShow) => (
        <Link
          href={{
            pathname: `/tvShows/${tvShow.id}`
          }}
          className="hover:transform-[scale(1.05)] transition-all duration-150 ease-in-out"
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
      )) : <p className="text-white">No series found.</p>}
    </div>
  )
}